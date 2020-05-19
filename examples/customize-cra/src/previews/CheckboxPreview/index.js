import React from 'react';
import { Checkbox } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const CheckboxPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Checkbox" title="Checkbox">
    <div className="components">
      <div className="component-row">
        <Checkbox.Group size={size} disabled={disabled}>
          <Checkbox value="apple">Apple</Checkbox>
          <Checkbox value="pear">Pear</Checkbox>
          <Checkbox value="orange">Orange</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </Checkbox.Group>
      </div>
    </div>
  </PreviewWrapper>
);

export default CheckboxPreview;
