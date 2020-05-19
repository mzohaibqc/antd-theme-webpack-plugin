import React from 'react';
import { Input, InputNumber } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const { Search, TextArea } = Input;

const InputPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Input" title="Input">
    <div className="components input">
      <div className="component-row">
        <Input placeholder="Basic usage" size={size} disabled={disabled} />
      </div>
      <div className="component-row">
        <Search
          placeholder="input search text"
          size={size}
          disabled={disabled}
        />
      </div>
      <div className="component-row">
        <Search placeholder="input search text" enterButton size={size} disabled={disabled} />
      </div>
      <div className="component-row">
        <InputNumber min={1} max={10} defaultValue={3} size={size} disabled={disabled} />
      </div>
      <div className="component-row">
        <TextArea rows={4} size={size} disabled={disabled} />
      </div>
    </div>
  </PreviewWrapper>
);

export default InputPreview;
