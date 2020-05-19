import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const AvatarPreview = ({ size }) => (
  <PreviewWrapper id="Avatar" title="Avatar">
    <div className="components">
      <div className="component-row">
        <div className="component-col">
          <Avatar size={size} icon={<UserOutlined />} />
        </div>
        <div className="component-col">
          <Avatar size={size} shape="square" icon={<UserOutlined />} />
        </div>
      </div>
      <div className="component-row">
        <div className="component-col">
          <Avatar size={size} icon={<UserOutlined />} />
        </div>
        <div className="component-col">
          <Avatar size={size}>U</Avatar>
        </div>
        <div className="component-col">
          <Avatar size={size}>USER</Avatar>
        </div>
        <div className="component-col">
          <Avatar size={size} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </div>
        <div className="component-col">
          <Avatar size={size} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
        </div>
        <div className="component-col">
          <Avatar size={size} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </div>
      </div>
    </div>
  </PreviewWrapper>
);

export default AvatarPreview;
