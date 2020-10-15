const { getShade } = require('../antd-theme-generator');

describe('Test getShade', () => {
  it('', () => {
    expect(getShade('@primary-5')).toEqual("color(~`colorPalette(\"@{primary-color}\", 5)`)")
    expect(getShade('@red-5')).toEqual("color(~`colorPalette(\"@{red}\", 5)`)")
  });
})
