import React from 'react';
import { Popover, Button } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const PopoverPreview = () => (
  <PreviewWrapper id="Popover" title="Popover">
    <div className="components popover">
      <div className="component-row">
        <div className="component-col">
          <Popover placement="topLeft" title={text} content={content}>
            <Button>Align edge / 边缘对齐</Button>
          </Popover>
        </div>
        <div className="component-col">
          <Popover placement="topLeft" title={text} content={content} arrowPointAtCenter>
            <Button>Arrow points to center / 箭头指向中心</Button>
          </Popover>
        </div>
      </div>
    </div>
  </PreviewWrapper>
);

export default PopoverPreview;
