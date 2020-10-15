import { AcceptedPlugin, Rule, Root } from 'postcss';

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
const properties: string[] = [
  'background', 'background-color',
  'border', 'border-left', 'border-right', 'border-bottom', 'border-top',
  'text-shadow', 'box-shadow'
];
const invalidColors: string[] = []; //['none', 'transparent'];
const numericValueRegex = /^\d+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw)$/
export const reducePlugin = (): AcceptedPlugin => {
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
  const cleanRule = (rule: Rule) => {
    let removeRule = true;
    rule.walkDecls((decl) => {
      let declRemoved = false;
      if (numericValueRegex.test(decl.value)) {
        decl.remove();
        declRemoved = true;
      }
      if (!declRemoved && invalidColors.indexOf(decl.value) > -1) {
        decl.remove();
        declRemoved = true;
      }
      if (
        properties.indexOf(decl.prop) === -1 &&
        !decl.prop.includes('color') &&
        !declRemoved
      ) {
        decl.remove();
      } else {
        removeRule = declRemoved ? removeRule : false;
      }
    });
    if (removeRule) {
      rule.remove();
    }
  };
  return (css: Root) => {
    css.walkAtRules((atRule) => {
      atRule.remove();
    });

    css.walkRules(cleanRule);

    css.walkComments((c) => c.remove());
  };
};

export default reducePlugin;
export const postcss = true;
