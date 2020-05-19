import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

/* eslint-disable jsx-a11y/anchor-has-content */

const BadgePreview = ({ size, disabled }) => (
  <PreviewWrapper id="Badge" title="Badge">
    <div className="components badge">
      <div className="component-row">
        <div className="component-col">
          <Badge count={5} size={size} disabled={disabled}>
            <a href="#" className="badge-square" />
          </Badge>
        </div>
        <div className="component-col">
          <Badge count={0} showZero size={size} disabled={disabled}>
            <a href="#" className="badge-square" />
          </Badge>
        </div>
        <div className="component-col">
          <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />} size={size} disabled={disabled}>
            <a href="#" className="badge-square" />
          </Badge>
        </div>
        <div className="component-col">
          <Badge count={99} size={size} disabled={disabled}>
            <a href="#" className="badge-square" />
          </Badge>
        </div>
        <div className="component-col">
          <Badge count={100} size={size} disabled={disabled}>
            <a href="#" className="badge-square" />
          </Badge>
        </div>
        <div className="component-col">
          <Badge count={99} overflowCount={10} size={size} disabled={disabled}>
            <a href="#" className="badge-square" />
          </Badge>
        </div>
        <div className="component-col">
          <Badge count={1000} overflowCount={999} size={size} disabled={disabled}>
            <a href="#" className="badge-square" />
          </Badge>
        </div>
        <div className="component-col">
          <Badge dot size={size} disabled={disabled}>
            <a href="#" className="badge-square" />
          </Badge>
        </div>
      </div>
      <div className="component-row">
        <div className="component-col">
          <Badge count={25} size={size} disabled={disabled} />
        </div>
        <div className="component-col">
          <Badge
            size={size}
            disabled={disabled}
            count={4}
            style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
          />
        </div>
        <div className="component-col">
          <Badge count={109} style={{ backgroundColor: '#52c41a' }} size={size} disabled={disabled} />
        </div>
      </div>
      <div className="component-row">
        <div className="component-col">
          <Badge status="success" text="Success" size={size} disabled={disabled} />
        </div>
        <div className="component-col">
          <Badge status="error" text="Error" size={size} disabled={disabled} />
        </div>
        <div className="component-col">
          <Badge status="default" text="Default" size={size} disabled={disabled} />
        </div>
        <div className="component-col">
          <Badge status="processing" text="Processing" size={size} disabled={disabled} />
        </div>
        <div className="component-col">
          <Badge status="warning" text="Warning" size={size} disabled={disabled} />
        </div>
      </div>
    </div>
  </PreviewWrapper>
);

export default BadgePreview;
