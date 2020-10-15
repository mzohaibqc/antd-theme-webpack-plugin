"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var antd_theme_generator_1 = require("./antd-theme-generator");
var AntDesignThemePlugin = /** @class */ (function () {
    function AntDesignThemePlugin(options) {
        this.colors = '';
        var defaulOptions = {
            varFile: path_1.default.join(__dirname, '../../src/styles/variables.less'),
            antDir: path_1.default.join(__dirname, '../../node_modules/antd'),
            stylesDir: path_1.default.join(__dirname, '../../src/styles/antd'),
            themeVariables: ['@primary-color'],
            indexFileName: 'index.html',
            generateOnce: false,
            lessUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js',
            publicPath: ''
        };
        this.options = Object.assign(defaulOptions, options);
        this.generated = false;
    }
    AntDesignThemePlugin.prototype.apply = function (compiler) {
        var _this = this;
        var options = this.options;
        compiler.hooks.emit.tapAsync('AntDesignThemePlugin', function (compilation, callback) {
            var less = "\n    <link rel=\"preload\" as=\"style\" type=\"text/css\" href=\"" + options.publicPath + "/color.less\" />\n    <script>\n      window.less = {\n        async: false,\n        env: 'production'\n      };\n    </script>\n    <script src=\"" + options.lessUrl + "\"></script>\n        ";
            if (options.indexFileName &&
                options.indexFileName in compilation.assets) {
                var index = compilation.assets[options.indexFileName];
                var content_1 = index.source();
                if (!content_1.match(/\/color\.less/g)) {
                    index.source = function () {
                        return content_1.replace(less, '').replace(/<body>/gi, "<body>" + less);
                    };
                    content_1 = index.source();
                    index.size = function () { return content_1.length; };
                }
            }
            if (options.generateOnce && _this.colors) {
                compilation.assets['color.less'] = {
                    source: function () { return _this.colors; },
                    size: function () { return _this.colors.length; }
                };
                return callback();
            }
            antd_theme_generator_1.generateTheme(options)
                .then(function (css) {
                if (options.generateOnce) {
                    _this.colors = css;
                }
                compilation.assets['color.less'] = {
                    source: function () { return css; },
                    size: function () { return css.length; }
                };
                callback();
            })
                .catch(function (err) {
                callback(err);
            });
        });
    };
    return AntDesignThemePlugin;
}());
exports.default = AntDesignThemePlugin;
