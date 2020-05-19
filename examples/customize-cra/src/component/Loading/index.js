import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const Loading = ({ pastDelay, timedOut, error }) => {
  if (pastDelay) {
    return (
      <Modal
        visible
        wrapClassName="backgroundNone"
        closable={false}
        footer={null}
        bodyStyle={{ background: 'rgba(208, 164, 34, 0)' }}
        style={{ textAlign: 'center', background: 'none' }}
      >
        <LoadingOutlined style={{ fontSize: 32, color: '#1890ff' }} />
        <p>Loading...</p>
      </Modal>
    );
  } else if (timedOut) {
    return <div>Taking a long time...</div>;
  } else if (error) {
    return <div>Error!</div>;
  }
  return null;
};

export default Loading;
