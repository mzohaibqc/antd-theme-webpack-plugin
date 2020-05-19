import React from 'react';
import { Cascader } from 'antd';
import PreviewWrapper from '../PreviewWrapper';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    disabled: true,
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
];

const CascaderPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Cascader" title="Cascader">
    <div className="components">
      <div className="component-row">
        <Cascader options={options} size={size} disabled={disabled} style={{ width: 300 }} />
      </div>
    </div>
  </PreviewWrapper>
);

export default CascaderPreview;
