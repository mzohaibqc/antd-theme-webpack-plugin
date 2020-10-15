const postcss = require('postcss');
import reducePlugin from '../reduce-plugin';

describe('Test reduce-plugin', () => {
  it('reducePlugin should remove all non-color declarations', () => {
    const css = postcss([reducePlugin()]).process(`
    body {
      font-family: 'Lato';
      background: #cccccc;
      color: #000;
      background-color: red;
      border: solid 1px #000;
      border-left: solid 1px #000;
      border-right: solid 1px #000;
      border-bottom: solid 1px #000;
      border-top: solid 1px #000;
      text-shadow: 2px 2px #ff0000;
      box-shadow: 5px 10px #888888;
      padding: 0;
      margin: 0;
    }
    // some comment
    .hello {
      margin-bottom: 10px;
      border-radius: 20px;
      background-url: url(someurl);
      border: 1px;
    }
  `);
    const expected = postcss.parse(css.css);

    // There must be 1 rule left after parsing
    expect(expected.nodes.length).toBe(1);
    expect(expected.nodes[0].selector).toBe('body');
    const rule = expected.nodes[0];
    // There must be 10 color related declarations left in 1st rule
    expect(rule.nodes.length).toBe(10);
    expect(rule.nodes[0].prop).toBe('background');
    expect(rule.nodes[1].prop).toBe('color');
  });
  it('reducePlugin should remove all empty rules after processing', () => {
    const css = postcss([reducePlugin()]).process(`
    body {
      padding: 0;
      margin: 0;
    }
    .hello {
      background-url: url(someurl);
      border: solid 1px red;
    }
  `);
    const expected = postcss.parse(css.css);

    // There must be 1 rule left after parsing
    expect(expected.nodes.length).toBe(1);
    expect(expected.nodes[0].selector).toBe('.hello');
  });

  it('reducePlugin should not remove border: 0, edge case for ant design date picker input border', () => {
    const css = postcss([reducePlugin()]).process(`
    .ant-picker-input {
      color: #000000;
      border: 0;
    }
  `);
    const expected = postcss.parse(css.css);
    expect(expected.nodes.length).toBe(1);
    // Both declarations should be there after parsing 
    expect(expected.nodes[0].nodes.length).toBe(2);
    expect(expected.nodes[0].nodes[0].prop).toBe('color');
    expect(expected.nodes[0].nodes[1].prop).toBe('border');
  });
  it('reducePlugin should remove declarations with numeric values like 10px, 100% etc.', () => {
    const css = postcss([reducePlugin()]).process(`
    .ant-picker-input {
      width: 100%;
      border: 1px;
      background-color: #ccc;
    }
  `);
    const expected = postcss.parse(css.css);
    expect(expected.nodes.length).toBe(1);
    // Only 1 declaration should remain
    expect(expected.nodes[0].nodes.length).toBe(1);
    expect(expected.nodes[0].nodes[0].prop).toBe('background-color');
  });
});
