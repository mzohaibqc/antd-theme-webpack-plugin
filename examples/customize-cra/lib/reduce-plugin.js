"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postcss = exports.reducePlugin = void 0;
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
var properties = [
    'background', 'background-color',
    'border', 'border-left', 'border-right', 'border-bottom', 'border-top',
    'text-shadow', 'box-shadow'
];
var invalidColors = []; //['none', 'transparent'];
var numericValueRegex = /^\d+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw)$/;
exports.reducePlugin = function () {
    // const cleanRule = (rule: Rule) => {
    //   if (rule.selector.startsWith('.main-color .palatte-')) {
    //     rule.remove();
    //     return;
    //   }
    //   let removeRule = true;
    //   rule.walkDecls(decl => {
    //     if (String(decl.value).match(/url\(.*\)/g)) {
    //       decl.remove();
    //     }
    //     const matched = false;
    //     /*
    //     this block causing https://github.com/ant-design/ant-design/issues/24777
    //     if (decl.prop !== 'background' && decl.prop.includes('background') && !decl.prop.match(/^background-(.*)color$/ig)) {
    //       decl.remove();
    //       matched = true;
    //     }
    //     if (decl.prop !== 'border' && decl.prop.includes('border') && !decl.prop.match(/^border-(.*)color$/ig)) {
    //       decl.remove();
    //       matched = true;
    //     }
    //     if (['transparent', 'inherit', 'none', '0'].includes(decl.value)) {
    //       decl.remove();
    //       matched = true;
    //     }
    //     */
    //     if (
    //       !decl.prop.includes('color') &&
    //       !decl.prop.includes('background') &&
    //       !decl.prop.includes('border') &&
    //       !decl.prop.includes('box-shadow') &&
    //       !Number.isNaN(decl.value)
    //     ) {
    //       // if (!matched) decl.remove();
    //       decl.remove();
    //     } else {
    //       removeRule = matched ? removeRule : false;
    //     }
    //   });
    //   if (removeRule) {
    //     rule.remove();
    //   }
    // }
    var cleanRule = function (rule) {
        var removeRule = true;
        rule.walkDecls(function (decl) {
            var declRemoved = false;
            if (numericValueRegex.test(decl.value)) {
                decl.remove();
                declRemoved = true;
            }
            if (!declRemoved && invalidColors.indexOf(decl.value) > -1) {
                decl.remove();
                declRemoved = true;
            }
            if (properties.indexOf(decl.prop) === -1 &&
                !decl.prop.includes('color') &&
                !declRemoved) {
                decl.remove();
            }
            else {
                removeRule = declRemoved ? removeRule : false;
            }
        });
        if (removeRule) {
            rule.remove();
        }
    };
    return function (css) {
        css.walkAtRules(function (atRule) {
            atRule.remove();
        });
        css.walkRules(cleanRule);
        css.walkComments(function (c) { return c.remove(); });
    };
};
exports.default = exports.reducePlugin;
exports.postcss = true;
