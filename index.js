const {generateTheme} = require("antd-theme-generator");
const {sources, Compilation, version} = require('webpack');
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
    const pluginName = 'AntDesignThemePlugin';

    if (version.startsWith('4.')) {
      compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) =>
        this.addAssets(compilation, compilation.assets, callback, '4'));
    }
    else {
      compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
        compilation.hooks.processAssets.tapAsync(
          {
            name: pluginName,
            stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
          },
          (assets, callback) => this.addAssets(compilation, assets, callback, '5')
        );
      });
    }
  }

  addAssets = (compilation, assets, callback, version) => {
    this.generateIndexContent(assets, version, compilation);

    if (this.options.generateOnce && this.colors) {
      this.generateColorStylesheet(compilation, this.colors, version);
      return callback();
    }

    generateTheme(this.options)
      .then(css => {
        if (this.options.generateOnce) {
          this.colors = css;
        }
        this.generateColorStylesheet(compilation, css, version);
        callback();
      })
      .catch(err => {
        callback(err);
      });

  };

  generateIndexContent = (assets, version, compilation) => {
    if (
      this.options.indexFileName &&
      this.options.indexFileName in assets
    ) {
      const index = assets[this.options.indexFileName];
      let content = index.source();

      if (!content.match(/\/color\.less/g)) {
        const less = `
        <link rel="stylesheet/less" type="text/css" href="${this.options.publicPath}/color.less" />
        <script>
            window.less = {
                async: false,
                env: 'production'
            };
        </script>
        <script type="text/javascript" src="${this.options.lessUrl}"></script>
    `;

        const updatedContent = content.replace(less, "").replace(/<body>/gi, `<body>${less}`);

        if (version === '5') {
          compilation.updateAsset(this.options.indexFileName, new sources.RawSource(updatedContent), { size: updatedContent.length });
        } else {
          index.source = () => updatedContent;
          index.size = () => updatedContent.length;
        }
      }
    }
  };

  generateColorStylesheet = (compilation, source, version) => {
    if (version === '5') {
      compilation.emitAsset('color.less', new sources.RawSource(source), { size: source.length });
    } else {
      compilation.assets['color.less'] = {
        source: () => source,
        size: () => source.length
      };
    }
  };
}


module.exports = AntDesignThemePlugin;
