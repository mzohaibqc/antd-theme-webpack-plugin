import React from 'react';
import { Rate } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const RatePreview = ({ size, disabled }) => (
  <PreviewWrapper id="Rate" title="Rate">
    <div className="components input">
      <div className="component-row">
        <Rate defaultValue={3} size={size} disabled={disabled} />
      </div>
      <div className="component-row">
        <span>
          <Rate allowHalf defaultValue={2.5} tooltips="good" size={size} disabled={disabled} /><span className="ant-rate-text">good</span>
        </span>
      </div>
      <div className="component-row">
        <Rate defaultValue={3} character="A" size={size} disabled={disabled} />
      </div>
    </div>
  </PreviewWrapper>
);

export default RatePreview;
