import React from 'react';
import { message, Button } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const success = () => {
  message.success('This is a success message');
};

const error = () => {
  message.error('This is an error message');
};

const info = () => {
  message.info('This is an info message');
};

const warning = () => {
  message.warning('This is a warning message');
};

const MessagePreview = ({ size, disabled }) => (
  <PreviewWrapper id="Message" title="Message">
    <div className="components message">
      <div className="component-row">
        <div className="component-col">
          <Button size={size} disabled={disabled} onClick={success}>success</Button>
        </div>
        <div className="component-col">
          <Button size={size} disabled={disabled} onClick={info}>info</Button>
        </div>
        <div className="component-col">
          <Button size={size} disabled={disabled} onClick={warning}>warning</Button>
        </div>
        <div className="component-col">
          <Button size={size} disabled={disabled} onClick={error}>error</Button>
        </div>
      </div>
    </div>
  </PreviewWrapper>
);

export default MessagePreview;
