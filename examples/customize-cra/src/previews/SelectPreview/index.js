import React from 'react';
import { Select } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const { Option, OptGroup } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const SelectPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Select" title="Select">
    <div className="components input">
      <div className="component-row">
        <div className="component-col">
          <Select defaultValue="lucy" style={{ width: 160 }} disabled={disabled} size={size}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <div className="component-col">
          <Select defaultValue="lucy" style={{ width: 160 }} disabled={disabled} size={size}>
            <OptGroup label="Manager">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </OptGroup>
            <OptGroup label="Engineer">
              <Option value="Yiminghe">yiminghe</Option>
            </OptGroup>
          </Select>
        </div>
      </div>
      <div className="component-row">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          disabled={disabled}
          size={size}
        >
          {children}
        </Select>
      </div>
    </div>
  </PreviewWrapper>
);

export default SelectPreview;
