import React from 'react';
import { Slider } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50'
    },
    label: <strong>100°C</strong>
  }
};

const SliderPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Slider" title="Slider">
    <div className="components">
      <div className="component-row">
        <Slider defaultValue={30} size={size} disabled={disabled} />
      </div>
      <div className="component-row">
        <Slider range marks={marks} defaultValue={[26, 37]} />
      </div>
    </div>
  </PreviewWrapper>
);

export default SliderPreview;
