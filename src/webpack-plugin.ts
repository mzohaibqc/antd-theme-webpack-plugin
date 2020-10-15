
import path from 'path';
import { Plugin, Compiler } from 'webpack';
import { generateTheme } from './antd-theme-generator';
import { WebpackPluginOptions } from './types';


class AntDesignThemePlugin {

  public options: WebpackPluginOptions;
  public generated: boolean;
  public colors: string = '';

  constructor (options: WebpackPluginOptions) {
    const defaulOptions: WebpackPluginOptions = {
      varFile: path.join(__dirname, '../../src/styles/variables.less'),
      antDir: path.join(__dirname, '../../node_modules/antd'),
      stylesDir: path.join(__dirname, '../../src/styles/antd'),
      themeVariables: ['@primary-color'],
      indexFileName: 'index.html',
      generateOnce: false,
      lessUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js',
      publicPath: ''
    };
    this.options = Object.assign(defaulOptions, options);
    this.generated = false;
  }

  apply (compiler: Compiler) {
    const options = this.options;
    compiler.hooks.emit.tapAsync('AntDesignThemePlugin', (compilation, callback) => {
      const less = `
    <link rel="preload" as="style" type="text/css" href="${options.publicPath}/color.less" />
    <script>
      window.less = {
        async: false,
        env: 'production'
      };
    </script>
    <script src="${options.lessUrl}"></script>
        `;
      if (
        options.indexFileName &&
        options.indexFileName in compilation.assets
      ) {
        const index = compilation.assets[options.indexFileName];
        let content = index.source();

        if (!content.match(/\/color\.less/g)) {
          index.source = () =>
            content.replace(less, '').replace(/<body>/gi, `<body>${less}`);
          content = index.source();
          index.size = () => content.length;
        }
      }
      if (options.generateOnce && this.colors) {
        compilation.assets['color.less'] = {
          source: () => this.colors,
          size: () => this.colors.length
        };
        return callback();
      }
      generateTheme(options)
        .then(css => {
          if (options.generateOnce) {
            this.colors = css;
          }
          compilation.assets['color.less'] = {
            source: () => css,
            size: () => css.length
          };
          callback();
        })
        .catch(err => {
          callback(err);
        });
    });
  }
}

export default AntDesignThemePlugin;
