const {generateTheme} = require("antd-theme-generator");
const {sources, Compilation} = require('webpack');
const path = require("path");

class AntDesignThemePlugin {
  constructor(options) {
    const defaultOptions = {
      varFile: path.join(__dirname, "../../src/styles/variables.less"),
      antDir: path.join(__dirname, "../../node_modules/antd"),
      stylesDir: path.join(__dirname, "../../src/styles/antd"),
      themeVariables: ["@primary-color"],
      indexFileName: "index.html",
      generateOnce: false,
      lessUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
      publicPath: ""
    };
    this.options = Object.assign(defaultOptions, options);
    this.generated = false;
  }

  apply(compiler) {
    const options = this.options;
    const pluginName = 'AntDesignThemePlugin';

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        },
        (assets, callback) => {
          const less = `
            <link rel="stylesheet/less" type="text/css" href="${options.publicPath}/color.less" />
            <script>
              window.less = {
                async: false,
                env: 'production'
              };
            </script>
            <script type="text/javascript" src="${options.lessUrl}"></script>
            `;

          if (
            options.indexFileName &&
            options.indexFileName in assets
          ) {
            const index = assets[options.indexFileName];
            let content = index.source();

            if (!content.match(/\/color\.less/g)) {
              const updatedContent = content.replace(less, "").replace(/<body>/gi, `<body>${less}`);
              compilation.updateAsset(options.indexFileName, new sources.RawSource(updatedContent), { size: updatedContent.length });
            }
          }

          if (options.generateOnce && this.colors) {
            compilation.emitAsset('color.less', new sources.RawSource(this.colors), { size: this.colors.length });
            return callback();
          }

          generateTheme(options)
            .then(css => {
              if (options.generateOnce) {
                this.colors = css;
              }

              compilation.emitAsset('color.less', new sources.RawSource(css), { size: css.length });
              callback();
            })
            .catch(err => {
              callback(err);
            });
        }
      );
    });
  }
}

module.exports = AntDesignThemePlugin;
