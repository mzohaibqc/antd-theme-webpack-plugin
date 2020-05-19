import React from 'react';
import { DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const ButtonPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Button" title="Button">
    <div className="components buttons">
      <div className="component-row">
        <div className="component-col">
          <Button type="primary" size={size} disabled={disabled}>Primary</Button>
        </div>
        <div className="component-col">
          <Button size={size} disabled={disabled}>Normal</Button>
        </div>
        <div className="component-col">
          <Button type="dashed" size={size} disabled={disabled}>Dashed</Button>
        </div>
        <div className="component-col">
          <Button type="danger" size={size} disabled={disabled}>Danger</Button>
        </div>
        <div className="component-col">
          <Button type="link" size={size} disabled={disabled}>Link</Button>
        </div>
      </div>
      <div className="component-row ghost">
        <div className="component-col">
          <Button type="primary" ghost size={size} disabled={disabled}>Primary</Button>
        </div>
        <div className="component-col">
          <Button ghost size={size} disabled={disabled}>Default</Button>
        </div>
        <div className="component-col">
          <Button ghost type="dashed" size={size} disabled={disabled}>Dashed</Button>
        </div>
        <div className="component-col">
          <Button ghost type="danger" size={size} disabled={disabled}>Danger</Button>
        </div>
        <div className="component-col">
          <Button ghost type="link" size={size} disabled={disabled}>Link</Button>
        </div>
      </div>
      <div className="component-row">
        <div className="component-col">
          <Button type="primary" icon={<DownloadOutlined />} size={size} disabled={disabled} />
        </div>
        <div className="component-col">
          <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} disabled={disabled} />
        </div>
        <div className="component-col">
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} disabled={disabled}>Download</Button>
        </div>
        <div className="component-col">
          <Button type="primary" icon={<DownloadOutlined />} size={size} disabled={disabled}>Download</Button>
        </div>
      </div>
      <div className="component-row">
        <Button.Group size={size}>
          <Button type="primary" disabled={disabled}>
            <LeftOutlined />
            Backward
          </Button>
          <Button type="primary" disabled={disabled}>
            Forward
            <RightOutlined disabled={disabled} />
          </Button>
        </Button.Group>
      </div>
    </div>
  </PreviewWrapper>
);

export default ButtonPreview;
