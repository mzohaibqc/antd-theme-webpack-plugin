import React from 'react';
import { Radio } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const RadioPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Radio" title="Radio">
    <div className="components">
      <div className="component-row">
        <Radio.Group defaultValue="banana" size={size} disabled={disabled}>
          <Radio value={1}>Apple</Radio>
          <Radio value={2}>Pear</Radio>
          <Radio value={3}>Banana</Radio>
          <Radio value={4}>Strawberry</Radio>
        </Radio.Group>
      </div>
      <div className="component-row">
        <Radio.Group defaultValue="a" size={size} disabled={disabled}>
          <Radio.Button value="a">Hangzhou</Radio.Button>
          <Radio.Button value="b">Shanghai</Radio.Button>
          <Radio.Button value="c">Beijing</Radio.Button>
          <Radio.Button value="d">Chengdu</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  </PreviewWrapper>
);

export default RadioPreview;
