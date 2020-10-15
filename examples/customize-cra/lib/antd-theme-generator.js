"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTheme = exports.compileAllLessFilesToCss = exports.render = exports.getMatches = exports.generateColorMap = exports.getColor = exports.randomColor = exports.getShade = exports.isValidColor = exports.getLessVars = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var glob_1 = __importDefault(require("glob"));
var postcss_1 = __importDefault(require("postcss"));
var less_1 = __importDefault(require("less"));
var hash_js_1 = __importDefault(require("hash.js"));
var less_bundle_promise_1 = __importDefault(require("less-bundle-promise"));
var less_plugin_npm_import_1 = __importDefault(require("less-plugin-npm-import"));
var strip_css_comments_1 = __importDefault(require("strip-css-comments"));
var reduce_plugin_1 = __importDefault(require("./reduce-plugin"));
var hashCache = '';
var cssCache = '';
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
function getLessVars(filePath, colorsOnly) {
    if (colorsOnly === void 0) { colorsOnly = false; }
    if (typeof filePath !== 'string' || !filePath.endsWith('.less')) {
        throw new Error('Invalid file path');
    }
    var sheet = fs_1.default.readFileSync(filePath).toString();
    var lessVars = {};
    var matches = sheet.match(/@(.*:[^;]*)/g) || [];
    matches.forEach(function (variable) {
        var definition = variable.split(/:\s*/);
        var varName = definition[0].replace(/['"]+/g, '').trim();
        var value = definition.splice(1).join(':');
        if (colorsOnly) {
            if (isValidColor(value)) {
                lessVars[varName] = value;
            }
        }
        else {
            lessVars[varName] = value;
        }
    });
    return lessVars;
}
exports.getLessVars = getLessVars;
/*
  This function takes color string as input and return true if string is a valid color otherwise returns false.
  e.g.
  isValidColor('#ffffff'); //true
  isValidColor('#fff'); //true
  isValidColor('rgba(0, 0, 0, 0.5)'); //true
  isValidColor('20px'); //false
*/
function isValidColor(color, customColorRegexArray) {
    if (customColorRegexArray === void 0) { customColorRegexArray = []; }
    if (color && color.includes('rgb'))
        return true;
    if (!color || color.match(/px/g))
        return false;
    if (color.match(/colorPalette|fade/g))
        return true;
    if (color.charAt(0) === '#') {
        color = color.substring(1);
        return [3, 4, 6, 8].indexOf(color.length) > -1 && !isNaN(parseInt(color, 16));
    }
    // eslint-disable-next-line
    var isColor = /^(rgb|hsl|hsv)a?\((\d+%?(deg|rad|grad|turn)?[,\s]+){2,3}[\s\/]*[\d\.]+%?\)$/i.test(color);
    if (isColor)
        return true;
    if (customColorRegexArray.length > 0) {
        return customColorRegexArray.reduce(function (prev, regex) {
            return prev || regex.test(color);
        }, false);
    }
    return false;
}
exports.isValidColor = isValidColor;
/*
  This function take primary color palette name and returns @primary-color dependent value
  .e.g
  Input: @primary-1
  Output: color(~`colorPalette("@{primary-color}", ' 1 ')`)
*/
function getShade(varName) {
    var result = varName.match(/(.*)-(\d)/);
    var className = '';
    var number = '';
    if (result) {
        className = result[1];
        number = result[2];
    }
    // let [, className, number] = result
    if (/primary-\d/.test(varName))
        className = '@primary-color';
    if (!className)
        return '';
    return 'color(~`colorPalette("@{' + className.replace('@', '') + '}", ' + number + ')`)';
}
exports.getShade = getShade;
/*
  Generated random hex color code
  e.g. #fe12ee
*/
function randomColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}
exports.randomColor = randomColor;
/*
Recursively get the color code assigned to a variable e.g.
@primary-color: #1890ff;
@link-color: @primary-color;

@link-color -> @primary-color ->  #1890ff
Which means
@link-color: #1890ff
*/
function getColor(varName, mappings) {
    var color = mappings[varName];
    if (color in mappings) {
        return getColor(color, mappings);
    }
    else {
        return color;
    }
}
exports.getColor = getColor;
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
function generateColorMap(content, customColorRegexArray) {
    if (customColorRegexArray === void 0) { customColorRegexArray = []; }
    return content
        .split('\n')
        .filter(function (line) { return line.startsWith('@') && line.indexOf(':') > -1; })
        .reduce(function (prev, next) {
        try {
            var matches = next.match(/(?=\S*['-])([@a-zA-Z0-9'-]+).*:[ ]{1,}(.*);/);
            if (!matches) {
                return prev;
            }
            var varName = matches[1], color = matches[2];
            if (color && color.startsWith('@')) {
                color = getColor(color, prev);
                if (!isValidColor(color, customColorRegexArray))
                    return prev;
                prev[varName] = color;
            }
            else if (isValidColor(color, customColorRegexArray)) {
                prev[varName] = color;
            }
            return prev;
        }
        catch (e) {
            console.log('e', e);
            return prev;
        }
    }, {});
}
exports.generateColorMap = generateColorMap;
function getMatches(string, regex) {
    var matches = {};
    var match;
    while ((match = regex.exec(string))) {
        if (match[2].startsWith('rgba') || match[2].startsWith('#')) {
            matches["@" + match[1]] = match[2];
        }
    }
    return matches;
}
exports.getMatches = getMatches;
/*
  This function takes less input as string and compiles into css.
*/
function render(text, paths) {
    return less_1.default.render(text, {
        paths: paths,
        javascriptEnabled: true,
        plugins: [new less_plugin_npm_import_1.default({ prefix: '~' })]
    });
}
exports.render = render;
function compileAllLessFilesToCss(stylesDir, antdStylesDir, varMap, varPath) {
    if (varMap === void 0) { varMap = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var stylesDirs, styles, csss, hashes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stylesDirs = [];
                    stylesDirs = stylesDirs.concat(stylesDir);
                    styles = [];
                    stylesDirs.forEach(function (s) {
                        styles = styles.concat(glob_1.default.sync(path_1.default.join(s, './**/*.less')));
                    });
                    return [4 /*yield*/, Promise.all(styles.map(function (filePath) {
                            var fileContent = fs_1.default.readFileSync(filePath).toString();
                            // Removed imports to avoid duplicate styles due to reading file separately as well as part of parent file (which is importing)
                            // if (avoidDuplicates) fileContent = fileContent.replace(/@import\ ["'](.*)["'];/g, '\n');
                            var r = /@import ["'](.*)["'];/g;
                            var directory = path_1.default.dirname(filePath);
                            fileContent = fileContent.replace(r, function (match, importPath, index, content) {
                                if (!importPath.endsWith('.less')) {
                                    importPath += '.less';
                                }
                                var newPath = path_1.default.join(directory, importPath);
                                // If imported path/file already exists in styles paths then replace import statement with empty line
                                if (styles.indexOf(newPath) === -1) {
                                    return match;
                                }
                                else {
                                    return '';
                                }
                            });
                            Object.keys(varMap).forEach(function (varName) {
                                fileContent = fileContent.replace(new RegExp("(:.*)(" + varName + ")", 'g'), function (match, group, a) {
                                    return match.replace(varName, varMap[varName]);
                                });
                            });
                            fileContent = "@import \"" + varPath + "\";\n" + fileContent;
                            // fileContent = `@import "~antd/lib/style/themes/default.less";\n${fileContent}`;
                            return less_1.default
                                .render(fileContent, {
                                paths: [antdStylesDir].concat(stylesDir),
                                filename: path_1.default.resolve(filePath),
                                javascriptEnabled: true,
                                plugins: [new less_plugin_npm_import_1.default({ prefix: '~' })]
                            })
                                .then(function (css) { return css.css; })
                                .catch(function (e) {
                                console.error("Error occurred compiling file " + filePath);
                                console.error('Error', e);
                                return '\n';
                            });
                        }))];
                case 1:
                    csss = _a.sent();
                    hashes = {};
                    return [2 /*return*/, csss
                            .map(function (c) {
                            var css = strip_css_comments_1.default(c, { preserve: false });
                            var hashCode = hash_js_1.default.sha256().update(css).digest('hex');
                            if (hashCode in hashes) {
                                return '';
                            }
                            else {
                                hashes[hashCode] = hashCode;
                                return css;
                            }
                        })
                            .join('\n')];
            }
        });
    });
}
exports.compileAllLessFilesToCss = compileAllLessFilesToCss;
/*
  This is main function which call all other functions to generate color.less file which contins all color
  related css rules based on Ant Design styles and your own custom styles
  By default color.less will be generated in /public directory
*/
function generateTheme(_a) {
    var antDir = _a.antDir, stylesDir = _a.stylesDir, varFile = _a.varFile, outputFilePath = _a.outputFilePath, _b = _a.themeVariables, themeVariables = _b === void 0 ? ['@primary-color'] : _b, _c = _a.customColorRegexArray, customColorRegexArray = _c === void 0 ? [] : _c;
    return __awaiter(this, void 0, void 0, function () {
        var antdStylesDir, nodeModulesPath, stylesDirs, styles_1, antdStylesFile, content_1, hashCode, themeCompiledVars_1, themeVars, lessPaths, randomColors_1, randomColorsVars_1, varFileContent, mappings_1, css_1, PRIMARY_RANDOM_COLOR_1, varsContent_1, colorFileContent, results, regex, userCustomCss, antLessContent_1, antdLess, fadeMap_1, fades, varsCombined_1, updatedFadeMap, antCss, allCss, shortLess, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 6, , 7]);
                    antdStylesDir = path_1.default.join(antDir, 'lib');
                    nodeModulesPath = path_1.default.join(antDir.slice(0, antDir.indexOf('node_modules')), './node_modules');
                    stylesDirs = [];
                    stylesDirs = stylesDirs.concat(stylesDir);
                    styles_1 = [];
                    stylesDirs.forEach(function (s) {
                        styles_1 = styles_1.concat(glob_1.default.sync(path_1.default.join(s, './**/*.less')));
                    });
                    antdStylesFile = path_1.default.join(antDir, './dist/antd.less');
                    /*
                      You own custom styles (Change according to your project structure)
                
                      - stylesDir - styles directory containing all less files
                      - varFile - variable file containing ant design specific and your own custom variables
                    */
                    varFile = varFile || path_1.default.join(antdStylesDir, './style/themes/default.less');
                    content_1 = '';
                    styles_1.forEach(function (filePath) {
                        content_1 += fs_1.default.readFileSync(filePath).toString();
                    });
                    hashCode = hash_js_1.default.sha256().update(content_1).digest('hex');
                    if (hashCode === hashCache) {
                        return [2 /*return*/, cssCache];
                    }
                    hashCache = hashCode;
                    themeCompiledVars_1 = {};
                    themeVars = themeVariables || ['@primary-color'];
                    lessPaths = [path_1.default.join(antdStylesDir, './style')].concat(stylesDir);
                    randomColors_1 = {};
                    randomColorsVars_1 = {};
                    varFileContent = combineLess(varFile, nodeModulesPath);
                    customColorRegexArray = __spreadArrays(customColorRegexArray, [
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
                    ].map(function (name) { return new RegExp(name + "(.*)"); }));
                    mappings_1 = Object.assign(generateColorMap(varFileContent, customColorRegexArray), getLessVars(varFile));
                    css_1 = '';
                    PRIMARY_RANDOM_COLOR_1 = '#123456';
                    themeVars = themeVars.filter(function (name) { return name in mappings_1 && !name.match(/(.*)-(\d)/); });
                    themeVars.forEach(function (varName) {
                        var color = randomColor();
                        if (varName === '@primary-color') {
                            color = PRIMARY_RANDOM_COLOR_1;
                        }
                        else {
                            while (randomColorsVars_1[color] && color === PRIMARY_RANDOM_COLOR_1 || color === '#000000' || color === '#ffffff') {
                                color = randomColor();
                            }
                        }
                        randomColors_1[varName] = color;
                        randomColorsVars_1[color] = varName;
                        css_1 = "." + varName.replace('@', '') + " { color: " + color + "; }\n " + css_1;
                    });
                    varsContent_1 = '';
                    themeVars.forEach(function (varName) {
                        [1, 2, 3, 4, 5, 7, 8, 9, 10].forEach(function (key) {
                            var name = varName === '@primary-color' ? "@primary-" + key : varName + "-" + key;
                            css_1 = "." + name.replace('@', '') + " { color: " + getShade(name) + "; }\n " + css_1;
                        });
                        varsContent_1 += varName + ": " + randomColors_1[varName] + ";\n";
                    });
                    colorFileContent = combineLess(path_1.default.join(antdStylesDir, './style/color/colors.less'), nodeModulesPath);
                    css_1 = colorFileContent + "\n" + varsContent_1 + "\n" + css_1;
                    return [4 /*yield*/, render(css_1, lessPaths)];
                case 1:
                    results = _d.sent();
                    css_1 = results.css;
                    css_1 = css_1.replace(/(\/.*\/)/g, '');
                    regex = /.(?=\S*['-])([.a-zA-Z0-9'-]+)\ {\n {2}color: (.*);/g;
                    themeCompiledVars_1 = getMatches(css_1, regex);
                    return [4 /*yield*/, compileAllLessFilesToCss(stylesDir, antdStylesDir, themeCompiledVars_1, varFile)];
                case 2:
                    userCustomCss = _d.sent();
                    antLessContent_1 = fs_1.default.readFileSync(antdStylesFile).toString();
                    return [4 /*yield*/, less_bundle_promise_1.default({
                            src: antdStylesFile
                        })];
                case 3:
                    antdLess = _d.sent();
                    fadeMap_1 = {};
                    fades = antdLess.match(/fade\(.*\)/g);
                    if (fades) {
                        fades.forEach(function (fade) {
                            if (!fade.startsWith('fade(@black') && !fade.startsWith('fade(@white') && !fade.startsWith('fade(#') && !fade.startsWith('fade(@color')) {
                                fadeMap_1[fade] = randomColor();
                            }
                        });
                    }
                    varsCombined_1 = '';
                    themeVars.forEach(function (varName) {
                        var color;
                        if (/(.*)-(\d)/.test(varName)) {
                            color = getShade(varName);
                            return;
                        }
                        else {
                            color = themeCompiledVars_1[varName];
                        }
                        varsCombined_1 = varsCombined_1 + "\n" + varName + ": " + color + ";";
                    });
                    antLessContent_1 = antdLess + "\n" + varsCombined_1;
                    updatedFadeMap = {};
                    Object.keys(fadeMap_1).forEach(function (fade) {
                        antLessContent_1 = antLessContent_1.replace(new RegExp(fade.replace('(', '\\(').replace(')', '\\)'), 'g'), fadeMap_1[fade]);
                    });
                    fadeMap_1 = __assign(__assign({}, fadeMap_1), updatedFadeMap);
                    return [4 /*yield*/, render(antLessContent_1, [antdStylesDir])];
                case 4:
                    antCss = (_d.sent()).css;
                    allCss = antCss + "\n" + userCustomCss;
                    return [4 /*yield*/, postcss_1.default([reduce_plugin_1.default()]).process(allCss, { from: antdStylesFile })];
                case 5:
                    shortLess = _d.sent();
                    css_1 = shortLess.css;
                    Object.keys(fadeMap_1).forEach(function (fade) {
                        css_1 = css_1.replace(new RegExp(fadeMap_1[fade], 'g'), fade);
                    });
                    Object.keys(themeCompiledVars_1).forEach(function (varName) {
                        var color;
                        if (/(.*)-(\d)/.test(varName)) {
                            color = themeCompiledVars_1[varName];
                            varName = getShade(varName);
                        }
                        else {
                            color = themeCompiledVars_1[varName];
                        }
                        color = color.replace('(', '\\(').replace(')', '\\)');
                        // css = css.replace(new RegExp(`${color}` + ' *;', 'g'), `${varName};`);
                        css_1 = css_1.replace(new RegExp(color, 'g'), "" + varName);
                    });
                    // Handle special cases
                    // 1. Replace fade(@primary-color, 20%) value i.e. fade(#123456, 20%) -> rgba(18, 52, 86, 0.2)
                    css_1 = css_1.replace(new RegExp('rgba\\(18, 52, 86, 0.2\\)', 'g'), 'fade(@primary-color, 20%)');
                    css_1 = css_1.replace(/@[\w-_]+:\s*.*;[\/.]*/gm, '');
                    // This is to replace \9 in Ant Design styles
                    css_1 = css_1.replace(/\\9/g, '');
                    css_1 = css_1.trim() + "\n" + combineLess(path_1.default.join(antdStylesDir, './style/themes/default.less'), nodeModulesPath);
                    themeVars.reverse().forEach(function (varName) {
                        css_1 = css_1.replace(new RegExp(varName + "( *):(.*);", 'g'), '');
                        css_1 = varName + ": " + mappings_1[varName] + ";\n" + css_1 + "\n";
                    });
                    css_1 = minifyCss(css_1);
                    if (outputFilePath) {
                        fs_1.default.writeFileSync(outputFilePath, css_1);
                        console.log("\uD83C\uDF08 Theme generated successfully. OutputFile: " + outputFilePath);
                    }
                    else {
                        console.log('Theme generated successfully');
                    }
                    cssCache = css_1;
                    return [2 /*return*/, cssCache];
                case 6:
                    error_1 = _d.sent();
                    console.log('error', error_1);
                    return [2 /*return*/, ''];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.generateTheme = generateTheme;
function minifyCss(css) {
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
function combineLess(filePath, nodeModulesPath) {
    var fileContent = fs_1.default.readFileSync(filePath).toString();
    var directory = path_1.default.dirname(filePath);
    return fileContent
        .split('\n')
        .map(function (line) {
        if (line.startsWith('@import')) {
            var matches = line.match(/@import\ ["'](.*)["'];/);
            var importPath = matches ? matches[1] : '';
            if (!importPath.endsWith('.less')) {
                importPath += '.less';
            }
            var newPath = path_1.default.join(directory, importPath);
            if (importPath.startsWith('~')) {
                importPath = importPath.replace('~', '');
                newPath = path_1.default.join(nodeModulesPath, "./" + importPath);
            }
            return combineLess(newPath, nodeModulesPath);
        }
        return line;
    })
        .join('\n');
}
