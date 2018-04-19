const fs = require('fs');
const path = require('path');
const glob = require('glob');
const postcss = require('postcss');
const less = require('less');
const bundle = require('less-bundle-promise');
/*
  Recursively get the color code assigned to a variable e.g.
  @primary-color: #1890ff;
  @link-color: @primary-color;
 
  @link-color -> @primary-color ->  #1890ff
  Which means
  @link-color: #1890ff
*/
function getColor(varName, mappings) {

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
function generateColorMap(content) {
  return content
    .split('\n')
    .filter(line => line.startsWith('@') && line.indexOf(':') > -1)
    .reduce(
      (prev, next) => {
        try {
          const matches = next.match(/(?=\S*['-])([@a-zA-Z0-9'-]+).*:[ ]{1,}(.*);/);
          if (!matches) {
            return prev;
          }
          let [, varName, color] = matches;
          // console.log(varName, color);
          if (color && color.startsWith('@')) {
            color = getColor(color, prev);
            if (!isValidColor(color)) return prev;
            prev[varName] = color;
          } else if (isValidColor(color)) {
            prev[varName] = color;
          }
          // console.log(varName, color);
          return prev;
        } catch (e) {
          console.log('e', e);
          return prev;
        }
      },
      {}
    );
}

/*
 This plugin will remove all css rules except those are related to colors
 e.g.
 Input: 
 .body { 
    font-family: 'Lato';
    background: #cccccc;
    color: #000;
    padding: 0;
    pargin: 0
 }

 Output: 
  .body {
    background: #cccccc;
    color: #000;
 }
*/
const reducePlugin = postcss.plugin('reducePlugin', () => {
  const cleanRule = rule => {
    if (rule.selector.startsWith('.main-color .palatte-')) {
      rule.remove();
      return;
    }
    let removeRule = true;
    rule.walkDecls(decl => {
      if (
        !decl.prop.includes('color') &&
        !decl.prop.includes('background') &&
        !decl.prop.includes('border') &&
        !decl.prop.includes('box-shadow')
      ) {
        decl.remove();
      } else {
        removeRule = false;
      }
    });
    if (removeRule) {
      rule.remove();
    }
  };
  return css => {
    css.walkAtRules(atRule => {
      atRule.remove();
    });

    css.walkRules(cleanRule);

    css.walkComments(c => c.remove());
  };
});

function getMatches(string, regex) {
  const matches = {};
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
function render(text, paths) {
  return less.render.call(less, text, {
    paths: paths,
    javascriptEnabled: true
  });
}

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
function getLessVars(filtPath) {
  const sheet = fs.readFileSync(filtPath).toString();
  const lessVars = {};
  const matches = sheet.match(/@(.*:[^;]*)/g) || [];

  matches.forEach(variable => {
    const definition = variable.split(/:\s*/);
    const varName = definition[0].replace(/['"]+/g, '').trim();
    lessVars[varName] = definition.splice(1).join(':');
  });
  return lessVars;
}

/*
  This function take primary color palette name and returns @primary-color dependent value
  .e.g 
  Input: @primary-1
  Output: color(~`colorPalette("@{primary-color}", ' 1 ')`)
*/
function getPrimaryShade(varName) {
  const number = varName.split('-')[1];
  return 'color(~`colorPalette("@{primary-color}", ' + number + ')`)';
}

/*
  This function takes color string as input and return true if string is a valid color otherwise returns false.
  e.g.
  isValidColor('#ffffff'); //true
  isValidColor('#fff'); //true 
  isValidColor('rgba(0, 0, 0, 0.5)'); //true
  isValidColor('20px'); //false
*/
function isValidColor(color) {
  if (!color || color.match(/px/g)) return false;
  if (color.match(/colorPalette|fade/g)) return true;
  if (color.charAt(0) === '#') {
    color = color.substring(1);
    return (
      [3, 4, 6, 8].indexOf(color.length) > -1 && !isNaN(parseInt(color, 16))
    );
  }
  return /^(rgb|hsl)a?\((\d+%?(deg|rad|grad|turn)?[,\s]+){2,3}[\s\/]*[\d\.]+%?\)$/i.test(color);
}

/*
  This is main function which call all other functions to generate color.less file which contins all color
  related css rules based on Ant Design styles and your own custom styles
  By default color.less will be generated in /public directory
*/
function generateColorLess(options) {
  return new Promise((resolve, reject) => {
    if (!(options.themeVariables && Array.isArray(options.themeVariables) && options.themeVariables.length > 0)) {
      console.log('Provide theme variable names to generate color.less')
      return resolve('');
    }
    /*
    Ant Design Specific Files (Change according to your project structure)
    You can even use different less based css framework and create color.less for  that
  
    - antd - ant design instalation path
    - entry - Ant Design less main file / entry file
    - styles - Ant Design less styles for each component
  */
    const antd = options.antDir;
    const stylesDir = options.stylesDir;
    const entry = path.join(antd, 'lib/style/index.less');
    const styles = glob.sync(path.join(antd, 'lib/*/style/index.less'));

    /*
      You own custom styles (Change according to your project structure)
      
      - stylesDir - styles directory containing all less files 
      - indexFile - less main file which imports all other custom styles
      - varFile - variable file containing ant design specific and your own custom variables
    */
    const indexFile = options.mainLessFile;
    const varFile = options.varFile;
    const customStyles = fs.readFileSync(indexFile).toString();

    let content = fs.readFileSync(entry).toString();
    content += '\n';
    styles.forEach(style => {
      content += `@import "${style}";\n`;
    });
    content += `\n${customStyles}`;
    let themeCompiledVars = {};
    let themeVars = options.themeVariables;
    const lessPaths = [
      path.join(antd, 'lib/styles'),
      path.join(antd, 'lib/style'),
      stylesDir
    ];
    bundle({
      src: varFile
    }).then(colorsLess => {
      const mappings = generateColorMap(colorsLess);
      return [mappings, colorsLess];
    }).then(([mappings, colorsLess]) => {
      let css = '';
      themeVars = themeVars.filter(name => name in mappings);
      themeVars.forEach(varName => {
        const color = mappings[varName];
        css = `.${varName.replace('@', '')} { color: ${color}; }\n ${css}`;
      });
      if (themeVars.includes('@primary-color')) {
        [1, 2, 3, 4, 5, 7, 8, 9, 10].forEach(key => {
          varName = `@primary-${key}`;
          css = `.${varName.replace('@', '')} { color: ${getPrimaryShade(varName)}; }\n ${css}`;
        })
      }
      css = `${colorsLess}\n${css}`;
      return render(css, lessPaths).then(({ css }) => [css, mappings, colorsLess]);
    }).then(([css, mappings, colorsLess]) => {
      css = css.replace(/(\/.*\/)/g, '');
      const regex = /.(?=\S*['-])([.a-zA-Z0-9'-]+)\ {\n\ \ color:\ (.*);/g;
      themeCompiledVars = getMatches(css, regex);
      content = `${content}\n${colorsLess}`;
      return render(content, lessPaths).then(({ css }) => [css, mappings, colorsLess]);
    }).then(([css, mappings, colorsLess]) => {
      return postcss([reducePlugin]).process(css, {
        parser: less.parser,
        from: entry
      }).then(({ css }) => [css, mappings, colorsLess]);
    }).then(([css, mappings, colorsLess]) => {
      themeVars.forEach(varName => {
        const color = mappings[varName];
        css = css.replace(new RegExp(`${color}`, 'g'), `${varName}`);
      });
      if (themeVars.includes('@primary-color')) {
        // primary shades
        [1, 2, 3, 4, 5, 7, 8, 9, 10].forEach(key => {
          varName = `@primary-${key}`;
          let color = mappings[varName];
          css = css.replace(new RegExp(`${themeCompiledVars[varName]}`, 'g'), `${color}`);
        });
      }
      css = `${colorsLess}\n${css}`;
      themeVars
        .reverse()
        .forEach(varName => {
          css = `${css}\n${varName}: ${mappings[varName]};\n`;
        });
      // fs.writeFileSync(colorFile, css);
      console.log('color.less generated successfully');
      return resolve(css);
    })
      .catch(err => {
        console.log('Error', err);
        reject(err)
      });
  });
}

module.exports = {
  generateColorLess,
  isValidColor,
  getLessVars,
  renderLessContent: render
}