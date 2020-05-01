const path = require('path');
const fs = require('fs');
const { generateTheme, getLessVars } = require('antd-theme-generator');

const defaultVars = getLessVars('./node_modules/antd/lib/style/themes/default.less')
const darkVars = { ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'), '@primary-color': defaultVars['@primary-color'] };
const lightVars = { ...getLessVars('./node_modules/antd/lib/style/themes/compact.less'), '@primary-color': defaultVars['@primary-color'] };
fs.writeFileSync('./src/dark.json', JSON.stringify(darkVars));
fs.writeFileSync('./src/light.json', JSON.stringify(lightVars));


const options = {
  stylesDir: path.join(__dirname, './src/styles'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/vars.less'),
  mainLessFile: path.join(__dirname, './src/styles/main.less'),
  themeVariables: Array.from(new Set([
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background',
    '@border-color-base',
    '@white',
    ...Object.keys(darkVars),
    ...Object.keys(lightVars)
  ])),
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, './public/color.less'),
  customColorRegexArray: [/^fade\(.*\)$/]
}

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
})
  .catch(error => {
    console.log('Error', error);
  });