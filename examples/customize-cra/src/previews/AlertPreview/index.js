import React from 'react';
import { Alert } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const AlertPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Alert" title="Alert">
    <div className="components alert">
      <div className="component-row">
        <Alert closable message="Success Tips" type="success" showIcon size={size} disabled={disabled} />
      </div>
      <div className="component-row">
        <Alert closable message="Informational Notes" type="info" showIcon size={size} disabled={disabled} />
      </div>
      <div className="component-row">
        <Alert closable message="Warning" type="warning" showIcon size={size} disabled={disabled} />
      </div>
      <div className="component-row">
        <Alert closable message="Error" type="error" showIcon size={size} disabled={disabled} />
      </div>
      <div className="component-row">
        <Alert
          closable
          message="Success Tips"
          description="Detailed description and advice about successful copywriting."
          type="success"
          showIcon
          size={size}
          disabled={disabled}
        />
      </div>
      <div className="component-row">
        <Alert
          closable
          message="Informational Notes"
          description="Additional description and information about copywriting."
          type="info"
          showIcon
          size={size}
          disabled={disabled}
        />
      </div>
      <div className="component-row">
        <Alert
          closable
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
          size={size}
          disabled={disabled}
        />
      </div>
      <div className="component-row">
        <Alert
          closable
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
          size={size}
          disabled={disabled}
        />
      </div>
    </div>
  </PreviewWrapper>
);

export default AlertPreview;
