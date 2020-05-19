import React from 'react';
import { Switch } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const SwitchPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Switch" title="Switch">
    <div className="components input">
      <div className="component-row">
        <Switch className="component-col" defaultChecked size={size} disabled={disabled} />
        <Switch className="component-col" checkedChildren="开" unCheckedChildren="关" defaultChecked size={size} disabled={disabled} />
        <Switch className="component-col" loading defaultChecked size={size} disabled={disabled} />
      </div>
    </div>
  </PreviewWrapper>
);

export default SwitchPreview;
