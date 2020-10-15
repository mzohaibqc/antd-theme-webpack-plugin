const path = require('path');
const { getLessVars } = require('../antd-theme-generator');
const { raisesError } = require('../test-utils')



describe('Test getLessVars', () => {
  const validFilePath = path.join(__dirname, './variables.less');
  const invalidFilePath = path.join(__dirname, './variables2.less');
  it('should return variables in less file', () => {
    const vars = getLessVars(validFilePath);
    expect(Object.keys(vars).length).toEqual(3);
    expect(vars['@primary-color']).toEqual('#ff0000');
    expect(vars['@secondary-color']).toEqual('#cccccc');
    expect(vars['@font-size-base']).toEqual('12px');
  });
  it('should raise if file does not end with .less', () => {
    raisesError(() => getLessVars(), 'Invalid file path');
    raisesError(() => getLessVars(''), 'Invalid file path');
    raisesError(() => getLessVars(0), 'Invalid file path');
    raisesError(() => getLessVars(false), 'Invalid file path');
    raisesError(() => getLessVars('somepath'), 'Invalid file path');
  });
  it('should raise if does not exists', () => {
    raisesError(() => getLessVars(invalidFilePath), `ENOENT: no such file or directory, open '${invalidFilePath}'`);
  });
  it('should only return color specific variables if colorsOnly option is provided', () => {
    const vars = getLessVars(validFilePath, true); // colorsOnly: true
    expect(Object.keys(vars).length).toEqual(2);
    expect(vars['@primary-color']).toEqual('#ff0000');
    expect(vars['@secondary-color']).toEqual('#cccccc');
    expect(vars['@font-size-base']).toEqual(undefined);
  });
});
