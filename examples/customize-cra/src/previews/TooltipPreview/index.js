import React from 'react';
import { Tooltip, Button } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const TooltipPreview = () => (
  <PreviewWrapper id="Tooltip" title="Tooltip">
    <div className="components tooltip">
      <div className="component-row">
        <div className="component-col">
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button>Align edge / 边缘对齐</Button>
          </Tooltip>
        </div>
        <div className="component-col">
          <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
            <Button>Arrow points to center / 箭头指向中心</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  </PreviewWrapper>
);

export default TooltipPreview;
