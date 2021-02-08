# Changelog
This document contains changes in this plugin with each version change.
## [1.3.8] - 2021-02-05 (latest)
Added support for webpack@5.0.0

## [1.3.7] - 2020-10-18
Fixed a bug. input box-shadow color was generated different for every build due to `fade()`, fixed now. Fixed slider handle active color
Fixed following bug:
https://github.com/mzohaibqc/antd-theme-webpack-plugin/issues/69
## [1.3.6] - 2020-06-06
- Fixed following issues
    - https://github.com/ant-design/ant-design/issues/24777
    - https://github.com/mzohaibqc/antd-theme-generator/issues/45
    - 
## [1.3.5] - 2020-05-19
- Rewamped base script to remove restriction to use unique theme color values for different variables, now you can use same color for multiple variables or even 
 variables as value for other variables
- now generated color.less size has been reduced by 30% or more (300kB -> 200kB) due to removal of redundant rules and ant design variables


## [1.3.3] - 2020-04-25
- Added code to remove statements with value containing url like `background: url('some url')`  in color.less file
- Here is detail about the issue: https://github.com/mzohaibqc/antd-theme-generator/issues/38
  

## [1.3.2] - 2020-04-25
- Added code to remove background-image url in color.less file
- Here is detail about the issue: https://github.com/mzohaibqc/antd-theme-generator/issues/8


## [1.3.1] - 2020-01-10
- Added a custom option, an array of regex to allow your custom color codes to match like `fade(@primary-color, 20%)`

## [1.3.0] - 2019-06-21
- Updated code to use new webpack plugin api using hooks.
- Fixed issue (Feature) [27](https://github.com/mzohaibqc/antd-theme-webpack-plugin/issues/27)
- No functionality change

## [1.2.1] - 2015-06-15
- Fixed issue (Bug) [25](https://github.com/mzohaibqc/antd-theme-webpack-plugin/issues/25)

## [1.2.0] - 2018-12-23
- Updated dependency verison from `antd-theme-generator@1.1.4` to `antd-theme-generator@1.1.5`
- Fixed a mistake in docs, changed `enableJavascript` to `javascriptEnabled`

## No Previous change logs