const AntDesignThemePlugin = require('./webpack-plugin');
const {
  generateTheme,
  isValidColor,
  getLessVars,
  randomColor,
  minifyCss,
  renderLessContent
} = require('./antd-theme-generator');

module.exports = AntDesignThemePlugin;

module.exports.generateTheme = generateTheme;
module.exports.isValidColor = isValidColor;
module.exports.getLessVars = getLessVars;
module.exports.randomColor = randomColor;
module.exports.minifyCss = minifyCss;
module.exports.renderLessContent = renderLessContent;
