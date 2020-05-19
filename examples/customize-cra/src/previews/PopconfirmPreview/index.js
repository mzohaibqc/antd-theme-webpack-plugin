import React from 'react';
import { Popconfirm, message } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

function confirm() {
  message.success('Click on Yes');
}

function cancel() {
  message.error('Click on No');
}


const PopconfirmPreview = () => (
  <PreviewWrapper id="Popover" title="Popover">
    <div className="components popover">
      <div className="component-row">
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Delete</a>
        </Popconfirm>
      </div>
    </div>
  </PreviewWrapper>
);

export default PopconfirmPreview;
