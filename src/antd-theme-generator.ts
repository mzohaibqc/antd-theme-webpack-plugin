import fs from 'fs';
import path from 'path';
import glob from 'glob';
import postcss from 'postcss';
import less from 'less';
import hash from 'hash.js';
import bundle from 'less-bundle-promise';
import NpmImportPlugin from 'less-plugin-npm-import';
import stripCssComments from 'strip-css-comments';
import reducePlugin from './reduce-plugin';
import { Vars, Options } from './types';

let hashCache: string = '';
let cssCache: string = '';

/*
  This funtion reads a less file and create an object with keys as variable names
  and values as variables respective values. e.g.
  //variabables.less
    @primary-color : #1890ff;
    @heading-color : #fa8c16;
    @text-color : #cccccc;

    to

    {
      '@primary-color' : '#1890ff',
      '@heading-color' : '#fa8c16',
      '@text-color' : '#cccccc'
    }

*/

export function getLessVars(filePath: string, colorsOnly: boolean = false): Vars {
  if (typeof filePath !== 'string' || !filePath.endsWith('.less')) {
    throw new Error('Invalid file path');
  }
  const sheet = fs.readFileSync(filePath).toString();
  const lessVars: any = {};
  const matches = sheet.match(/@(.*:[^;]*)/g) || [];

  matches.forEach((variable) => {
    const definition = variable.split(/:\s*/);
    const varName = definition[0].replace(/['"]+/g, '').trim();
    const value = definition.splice(1).join(':');
    if (colorsOnly) {
      if (isValidColor(value)) {
        lessVars[varName] = value;
      }
    } else {
      lessVars[varName] = value;
    }
  });
  return lessVars;
}

/*
  This function takes color string as input and return true if string is a valid color otherwise returns false.
  e.g.
  isValidColor('#ffffff'); //true
  isValidColor('#fff'); //true
  isValidColor('rgba(0, 0, 0, 0.5)'); //true
  isValidColor('20px'); //false
*/
export function isValidColor(color: string, customColorRegexArray: RegExp[] = []): boolean {
  if (color && color.includes('rgb')) return true;
  if (!color || color.match(/px/g)) return false;
  if (color.match(/colorPalette|fade/g)) return true;
  if (color.charAt(0) === '#') {
    color = color.substring(1);
    return [3, 4, 6, 8].indexOf(color.length) > -1 && !isNaN(parseInt(color, 16));
  }
  // eslint-disable-next-line
  const isColor = /^(rgb|hsl|hsv)a?\((\d+%?(deg|rad|grad|turn)?[,\s]+){2,3}[\s\/]*[\d\.]+%?\)$/i.test(color);
  if (isColor) return true;
  if (customColorRegexArray.length > 0) {
    return customColorRegexArray.reduce((prev: boolean, regex: RegExp): boolean => {
      return prev || regex.test(color);
    }, false);
  }
  return false;
}

/*
  This function take primary color palette name and returns @primary-color dependent value
  .e.g
  Input: @primary-1
  Output: color(~`colorPalette("@{primary-color}", ' 1 ')`)
*/
export function getShade(varName: string): string {
  const result: RegExpMatchArray | null = varName.match(/(.*)-(\d)/);
  let className: string = '';
  let number: string = '';
  if (result) {
    className = result[1];
    number = result[2];
  }
  // let [, className, number] = result
  if (/primary-\d/.test(varName)) className = '@primary-color';
  if (!className) return '';
  return 'color(~`colorPalette("@{' + className.replace('@', '') + '}", ' + number + ')`)';
}

/*
  Generated random hex color code
  e.g. #fe12ee
*/
export function randomColor(): string {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

/*
Recursively get the color code assigned to a variable e.g.
@primary-color: #1890ff;
@link-color: @primary-color;

@link-color -> @primary-color ->  #1890ff
Which means
@link-color: #1890ff
*/
export function getColor(varName: string, mappings: Vars): string {
  const color = mappings[varName];
  if (color in mappings) {
    return getColor(color, mappings);
  } else {
    return color;
  }
}

/*
  Read following files and generate color variables and color codes mapping
    - Ant design color.less, themes/default.less
    - Your own variables.less
  It will generate map like this
  {
    '@primary-color': '#00375B',
    '@info-color': '#1890ff',
    '@success-color': '#52c41a',
    '@error-color': '#f5222d',
    '@normal-color': '#d9d9d9',
    '@primary-6': '#1890ff',
    '@heading-color': '#fa8c16',
    '@text-color': '#cccccc',
    ....
  }
*/
export function generateColorMap(content: string, customColorRegexArray: RegExp[] = []): Vars {
  return content
    .split('\n')
    .filter((line) => line.startsWith('@') && line.indexOf(':') > -1)
    .reduce((prev: Vars, next: string): Vars => {
      try {
        const matches = next.match(/(?=\S*['-])([@a-zA-Z0-9'-]+).*:[ ]{1,}(.*);/);
        if (!matches) {
          return prev;
        }
        let [, varName, color] = matches;
        if (color && color.startsWith('@')) {
          color = getColor(color, prev);
          if (!isValidColor(color, customColorRegexArray)) return prev;
          prev[varName] = color;
        } else if (isValidColor(color, customColorRegexArray)) {
          prev[varName] = color;
        }
        return prev;
      } catch (e) {
        console.log('e', e);
        return prev;
      }
    }, {});
}

export function getMatches(string: string, regex: RegExp) {
  const matches: Vars = {};
  let match;
  while ((match = regex.exec(string))) {
    if (match[2].startsWith('rgba') || match[2].startsWith('#')) {
      matches[`@${match[1]}`] = match[2];
    }
  }
  return matches;
}

/*
  This function takes less input as string and compiles into css.
*/
export function render(text: string, paths: string[]) {
  return less.render(text, {
    paths: paths,
    javascriptEnabled: true,
    plugins: [new NpmImportPlugin({ prefix: '~' })]
  });
}

export async function compileAllLessFilesToCss(
  stylesDir: string | string[],
  antdStylesDir: string,
  varMap: Vars = {},
  varPath: string,
): Promise<string> {
  /*
    Get all less files path in styles directory
    and then compile all to css and join
  */
  let stylesDirs: string[] = [];
  stylesDirs = stylesDirs.concat(stylesDir);
  let styles: string[] = [];
  stylesDirs.forEach((s) => {
    styles = styles.concat(glob.sync(path.join(s, './**/*.less')));
  });
  const csss = await Promise.all(
    styles.map((filePath) => {
      let fileContent = fs.readFileSync(filePath).toString();
      // Removed imports to avoid duplicate styles due to reading file separately as well as part of parent file (which is importing)
      // if (avoidDuplicates) fileContent = fileContent.replace(/@import\ ["'](.*)["'];/g, '\n');
      const r = /@import ["'](.*)["'];/g;
      const directory = path.dirname(filePath);
      fileContent = fileContent.replace(r, function (match, importPath, index, content) {
        if (!importPath.endsWith('.less')) {
          importPath += '.less';
        }
        const newPath = path.join(directory, importPath);
        // If imported path/file already exists in styles paths then replace import statement with empty line
        if (styles.indexOf(newPath) === -1) {
          return match;
        } else {
          return '';
        }
      });
      Object.keys(varMap).forEach((varName) => {
        fileContent = fileContent.replace(new RegExp(`(:.*)(${varName})`, 'g'), (match, group, a) => {
          return match.replace(varName, varMap[varName]);
        });
      });
      fileContent = `@import "${varPath}";\n${fileContent}`;
      // fileContent = `@import "~antd/lib/style/themes/default.less";\n${fileContent}`;
      return less
        .render(fileContent, {
          paths: [antdStylesDir].concat(stylesDir),
          filename: path.resolve(filePath),
          javascriptEnabled: true,
          plugins: [new NpmImportPlugin({ prefix: '~' })]
        })
        .then((css) => css.css)
        .catch((e: Error) => {
          console.error(`Error occurred compiling file ${filePath}`);
          console.error('Error', e);
          return '\n';
        });
    }),
  );
  const hashes: Vars = {};
  
  return csss
    .map((c) => {
      const css = stripCssComments(c, { preserve: false });
      const hashCode = hash.sha256().update(css).digest('hex');
      if (hashCode in hashes) {
        return '';
      } else {
        hashes[hashCode] = hashCode;
        return css;
      }
    })
    .join('\n');
}

/*
  This is main function which call all other functions to generate color.less file which contins all color
  related css rules based on Ant Design styles and your own custom styles
  By default color.less will be generated in /public directory
*/
export async function generateTheme({
  antDir,
  antdStylesDir,
  stylesDir,
  varFile,
  outputFilePath,
  themeVariables = ['@primary-color'],
  customColorRegexArray = [],
}: Options) {
  try {
    antdStylesDir = antdStylesDir || path.join(antDir, 'lib');
    const nodeModulesPath = path.join(antDir.slice(0, antDir.indexOf('node_modules')), './node_modules');
    /*
      stylesDir can be array or string
    */
    let stylesDirs: string[] = [];
    stylesDirs = stylesDirs.concat(stylesDir);
    let styles: string[] = [];
    stylesDirs.forEach((s) => {
      styles = styles.concat(glob.sync(path.join(s, './**/*.less')));
    });

    const antdStylesFile = path.join(antDir, './dist/antd.less');
    /*
      You own custom styles (Change according to your project structure)

      - stylesDir - styles directory containing all less files
      - varFile - variable file containing ant design specific and your own custom variables
    */
    varFile = varFile || path.join(antdStylesDir, './style/themes/default.less');

    let content = '';
    styles.forEach((filePath) => {
      content += fs.readFileSync(filePath).toString();
    });

    const hashCode = hash.sha256().update(content).digest('hex');
    if (hashCode === hashCache) {
      return cssCache;
    }
    hashCache = hashCode;
    let themeCompiledVars: Vars = {};
    let themeVars = themeVariables || ['@primary-color'];
    const lessPaths = [path.join(antdStylesDir, './style')].concat(stylesDir);

    const randomColors: Vars = {};
    const randomColorsVars: Vars = {};
    /*
    Ant Design Specific Files (Change according to your project structure)
    You can even use different less based css framework and create color.less for  that

    - antDir - ant design instalation path
    - entry - Ant Design less main file / entry file
    - styles - Ant Design less styles for each component

    1. Bundle all variables into one file
    2. process vars and create a color name, color value key value map
    3. Get variables which are part of theme
    4.
  */

    const varFileContent = combineLess(varFile, nodeModulesPath);

    customColorRegexArray = [
      ...customColorRegexArray,
      ...[
        'color',
        'lighten',
        'darken',
        'saturate',
        'desaturate',
        'fadein',
        'fadeout',
        'fade',
        'spin',
        'mix',
        'hsv',
        'tint',
        'shade',
        'greyscale',
        'multiply',
        'contrast',
        'screen',
        'overlay',
      ].map((name) => new RegExp(`${name}\(.*\)`)),
    ];
    const mappings = Object.assign(generateColorMap(varFileContent, customColorRegexArray), getLessVars(varFile));
    let css = '';
    const PRIMARY_RANDOM_COLOR = '#123456';
    themeVars = themeVars.filter((name) => name in mappings && !name.match(/(.*)-(\d)/));
    themeVars.forEach((varName) => {
      let color = randomColor();
      if (varName === '@primary-color') {
        color = PRIMARY_RANDOM_COLOR;
      } else {
        while (randomColorsVars[color] && color === PRIMARY_RANDOM_COLOR || color === '#000000' || color === '#ffffff') {
          color = randomColor();
        }
      }
      randomColors[varName] = color;
      randomColorsVars[color] = varName;
      css = `.${varName.replace('@', '')} { color: ${color}; }\n ${css}`;
    });

    let varsContent = '';
    themeVars.forEach((varName) => {
      [1, 2, 3, 4, 5, 7, 8, 9, 10].forEach((key) => {
        const name = varName === '@primary-color' ? `@primary-${key}` : `${varName}-${key}`;
        css = `.${name.replace('@', '')} { color: ${getShade(name)}; }\n ${css}`;
      });
      varsContent += `${varName}: ${randomColors[varName]};\n`;
    });

    // This is to compile colors
    // Put colors.less content first,
    // then add random color variables to override the variables values for given theme variables with random colors
    // Then add css containinf color variable classes
    const colorFileContent = combineLess(path.join(antdStylesDir, './style/color/colors.less'), nodeModulesPath);
    css = `${colorFileContent}\n${varsContent}\n${css}`;

    let results = await render(css, lessPaths);
    css = results.css;
    css = css.replace(/(\/.*\/)/g, '');
    const regex = /.(?=\S*['-])([.a-zA-Z0-9'-]+)\ {\n {2}color: (.*);/g;
    themeCompiledVars = getMatches(css, regex);

    // Convert all custom user less files to css
    const userCustomCss = await compileAllLessFilesToCss(stylesDir, antdStylesDir, themeCompiledVars, varFile);

    let antLessContent = fs.readFileSync(antdStylesFile).toString();
    const antdLess = await bundle({
      src: antdStylesFile
    });
    // fs.writeFileSync('./antd.less', antdLess);
    // const antdLess = bundle(antdStylesFile, nodeModulesPath)
    let fadeMap: Vars = {};
    const fades: string[] = antdLess.match(/fade\(.*\)/g);
    if (fades) {
      fades.forEach(fade => {
        if (!fade.startsWith('fade(@black') && !fade.startsWith('fade(@white') && !fade.startsWith('fade(#') && !fade.startsWith('fade(@color')) {
          fadeMap[fade] = randomColor();
        }
      });
    }
    let varsCombined = '';
    themeVars.forEach((varName) => {
      let color;
      if (/(.*)-(\d)/.test(varName)) {
        color = getShade(varName);
        return;
      } else {
        color = themeCompiledVars[varName];
      }
      varsCombined = `${varsCombined}\n${varName}: ${color};`;
    });

    antLessContent = `${antdLess}\n${varsCombined}`;
    const updatedFadeMap: Vars = {};
    Object.keys(fadeMap).forEach(fade => {
      antLessContent = antLessContent.replace(new RegExp(fade.replace('(', '\\(').replace(')', '\\)'), 'g'), fadeMap[fade]);
    })
    fadeMap = { ...fadeMap, ...updatedFadeMap }
    // antLessContent = `${antLessContent}\n${varsCombined}`;

    const { css: antCss } = await render(antLessContent, [antdStylesDir]);
    const allCss = `${antCss}\n${userCustomCss}`;
    const shortLess = await postcss([reducePlugin()]).process(allCss, { from: antdStylesFile });
    css = shortLess.css;
    Object.keys(fadeMap).forEach(fade => {
      css = css.replace(new RegExp(fadeMap[fade], 'g'), fade)
    })
    Object.keys(themeCompiledVars).forEach((varName) => {
      let color;
      if (/(.*)-(\d)/.test(varName)) {
        color = themeCompiledVars[varName];
        varName = getShade(varName);
      } else {
        color = themeCompiledVars[varName];
      }
      color = color.replace('(', '\\(').replace(')', '\\)');
      // css = css.replace(new RegExp(`${color}` + ' *;', 'g'), `${varName};`);
      css = css.replace(new RegExp(color, 'g'), `${varName}`);
    });
    // Handle special cases
    // 1. Replace fade(@primary-color, 20%) value i.e. fade(#123456, 20%) -> rgba(18, 52, 86, 0.2)
    css = css.replace(new RegExp('rgba\\(18, 52, 86, 0.2\\)', 'g'), 'fade(@primary-color, 20%)');

    css = css.replace(/@[\w-_]+:\s*.*;[\/.]*/gm, '');

    // This is to replace \9 in Ant Design styles
    css = css.replace(/\\9/g, '');
    css = `${css.trim()}\n${combineLess(path.join(antdStylesDir, './style/themes/default.less'), nodeModulesPath)}`;

    themeVars.reverse().forEach((varName) => {
      css = css.replace(new RegExp(`${varName}( *):(.*);`, 'g'), '');
      css = `${varName}: ${mappings[varName]};\n${css}\n`;
    });

    css = minifyCss(css);

    if (outputFilePath) {
      fs.writeFileSync(outputFilePath, css);
      console.log(`🌈 Theme generated successfully. OutputFile: ${outputFilePath}`);
    } else {
      console.log('Theme generated successfully');
    }
    cssCache = css;
    return cssCache;
  } catch (error) {
    console.log('error', error);
    return '';
  }
}

function minifyCss(css: string): string {
  // Removed all comments and empty lines
  css = css.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/^\s*$(?:\r\n?|\n)/gm, '');

  /*
  Converts from

    .abc,
    .def {
      color: red;
      background: blue;
      border: grey;
    }

    to

    .abc,
    .def {color: red;
      background: blue;
      border: grey;
    }

  */
  css = css.replace(/\{(\r\n?|\n)\s+/g, '{');

  /*
  Converts from

  .abc,
  .def {color: red;
  }

  to

  .abc,
  .def {color: red;
    background: blue;
    border: grey;}

  */
  css = css.replace(/;(\r\n?|\n)\}/g, ';}');

  /*
  Converts from

  .abc,
  .def {color: red;
    background: blue;
    border: grey;}

  to

  .abc,
  .def {color: red;background: blue;border: grey;}

  */
  css = css.replace(/;(\r\n?|\n)\s+/g, ';');

  /*
Converts from

.abc,
.def {color: red;background: blue;border: grey;}

to

.abc, .def {color: red;background: blue;border: grey;}

*/
  css = css.replace(/,(\r\n?|\n)[.]/g, ', .');
  return css;
}

// const removeColorCodesPlugin = postcss.plugin('removeColorCodesPlugin', () => {
//   const cleanRule = rule => {
//     let removeRule = true;
//     rule.walkDecls(decl => {
//       if (
//         !decl.value.includes('@')
//       ) {
//         decl.remove();
//       } else {
//         removeRule = false;
//       }
//     });
//     if (removeRule) {
//       rule.remove();
//     }
//   };
//   return css => {
//     css.walkRules(cleanRule);
//   };
// });

function combineLess(filePath: string, nodeModulesPath: string): string {
  const fileContent = fs.readFileSync(filePath).toString();
  const directory = path.dirname(filePath);
  return fileContent
    .split('\n')
    .map((line) => {
      if (line.startsWith('@import')) {
        const matches = line.match(/@import\ ["'](.*)["'];/);
        let importPath = matches ? matches[1] : '';
        if (!importPath.endsWith('.less')) {
          importPath += '.less';
        }
        let newPath = path.join(directory, importPath);
        if (importPath.startsWith('~')) {
          importPath = importPath.replace('~', '');
          newPath = path.join(nodeModulesPath, `./${importPath}`);
        }
        return combineLess(newPath, nodeModulesPath);
      }
      return line;
    })
    .join('\n');
}
