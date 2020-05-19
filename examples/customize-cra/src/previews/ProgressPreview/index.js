import React from 'react';
import { Progress } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const ProgressPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Progress" title="Progress">
    <div className="components progress">
      <div className="component-row">
        <Progress size={size} disabled={disabled} percent={30} />
        <Progress size={size} disabled={disabled} percent={50} status="active" />
        <Progress size={size} disabled={disabled} percent={70} status="exception" />
        <Progress size={size} disabled={disabled} percent={100} />
        <Progress size={size} disabled={disabled} percent={50} showInfo={false} />
      </div>
      <div className="component-row">
        <Progress className="component-col" size={size} disabled={disabled} type="circle" percent={75} />
        <Progress className="component-col" size={size} disabled={disabled} type="circle" percent={70} status="exception" />
        <Progress className="component-col" size={size} disabled={disabled} type="circle" percent={100} />
        <Progress className="component-col" size={size} disabled={disabled} type="dashboard" percent={60} successPercent={30} />
      </div>
    </div>
  </PreviewWrapper>
);

export default ProgressPreview;
