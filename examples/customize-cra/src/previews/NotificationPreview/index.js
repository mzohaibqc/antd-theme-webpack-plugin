import React from 'react';
import { notification, Button } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
  });
};

const NotificationPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Notification" title="Notification">
    <div className="components notification">
      <div className="component-row">
        <div className="component-col">
          <Button size={size} disabled={disabled} onClick={() => openNotificationWithIcon('success')}>success</Button>
        </div>
        <div className="component-col">
          <Button size={size} disabled={disabled} onClick={() => openNotificationWithIcon('info')}>info</Button>
        </div>
        <div className="component-col">
          <Button size={size} disabled={disabled} onClick={() => openNotificationWithIcon('warning')}>warning</Button>
        </div>
        <div className="component-col">
          <Button size={size} disabled={disabled} onClick={() => openNotificationWithIcon('error')}>error</Button>
        </div>
      </div>
    </div>
  </PreviewWrapper>
);

export default NotificationPreview;
