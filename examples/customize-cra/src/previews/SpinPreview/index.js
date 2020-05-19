import React from 'react';
import { Spin, Alert } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const SpinPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Spin" title="Spin">
    <div className="components spin">
      <div className="component-row">
        <Spin tip="Loading..." size={size} disabled={disabled}>
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
      </div>
    </div>
  </PreviewWrapper>
);

export default SpinPreview;
