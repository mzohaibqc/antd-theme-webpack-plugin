const path = require('path');
const theme = require('./antd-theme');

class AntDesignThemePlugin {
  constructor(options) {
    const defaulOptions = {
      varFile: path.join(__dirname, '../../src/styles/variables.less'),
      mainLessFile: path.join(__dirname, '../../src/styles/index.less'),
      antDir: path.join(__dirname, '../../node_modules/antd'),
      stylesDir: path.join(__dirname, '../../src/styles/antd'),
      themeVariables: ['@primary-color'],
      indexFileName: 'index.html'
    }
    this.options = { ...defaulOptions, ...(options || {}) };
  }

  apply(compiler) {
    const options = this.options;
    compiler.plugin('emit', function (compilation, callback) {
      theme.generateColorLess(options).then(css => {
        const less = `
        <link rel="stylesheet/less" type="text/css" href="/color.less" />
        <script>
          window.less = {
            async: true,
            env: 'production'
          };
        </script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script>
        `;
        if (options.indexFileName in compilation.assets) {
          const index = compilation.assets[options.indexFileName];
          let content = index.source();

          if (!content.match(/\/color\.less/g)) {
            index.source = () => content.replace(less, '').replace(/<\/body>/ig, less + '</body>');
            content = index.source();
            index.size = () => content.length;
          }
        }

        compilation.assets['color.less'] = {
          source: () => css,
          size: () => css.length
        }
        callback();
      })
        .catch(err => {
          callback(err)
        })

    });
  }
}

module.exports = AntDesignThemePlugin;