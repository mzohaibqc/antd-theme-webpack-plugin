import React from 'react';
import PreviewWrapper from '../PreviewWrapper';
import './style.less';

const ColorPreview = () => (
  <PreviewWrapper id="Color" title="Color">
    <div className="colors">
      <div className="color-row">
        <div className="color-item primary">
          <div className="color-item-content">
            <div className="name">@primary-color</div>
            <div className="value">全局主色</div>
          </div>
        </div>
        <div className="color-item success">
          <div className="color-item-content">
            <div className="name">@success-color</div>
            <div className="value">成功色</div>
          </div>
        </div>
        <div className="color-item info">
          <div className="color-item-content">
            <div className="name">@info-color</div>
            <div className="value">提示色</div>
          </div>
        </div>
        <div className="color-item warning">
          <div className="color-item-content">
            <div className="name">@warning-color</div>
            <div className="value">警告色</div>
          </div>
        </div>
        <div className="color-item error">
          <div className="color-item-content">
            <div className="name">@error-color</div>
            <div className="value">错误色</div>
          </div>
        </div>
        <div className="color-item highlight">
          <div className="color-item-content">
            <div className="name">@highlight-color</div>
            <div className="value">高亮色</div>
          </div>
        </div>
      </div>
      <div className="color-row">
        <div className="color-item body-background">
          <div className="color-item-content">
            <div className="name">@body-background</div>
            <div className="value">body背景色</div>
          </div>
        </div>
        <div className="color-item component-background">
          <div className="color-item-content">
            <div className="name">@component-background</div>
            <div className="value">组件背景色</div>
          </div>
        </div>
        <div className="color-item layout-header-background">
          <div className="color-item-content">
            <div className="name">@layout-header-background</div>
            {/* <div className="value"></div> */}
          </div>
        </div>
        <div className="color-item layout-body-background">
          <div className="color-item-content">
            <div className="name">@layout-body-background</div>
            {/* <div className="value"></div> */}
          </div>
        </div>
        <div className="color-item layout-footer-background">
          <div className="color-item-content">
            <div className="name">@layout-footer-background</div>
            {/* <div className="value"></div> */}
          </div>
        </div>
        <div className="color-item border-color-base">
          <div className="color-item-content">
            <div className="name">@border-color-base</div>
            <div className="value">边框色</div>
          </div>
        </div>
        <div className="color-item border-color-split">
          <div className="color-item-content">
            <div className="name">@border-color-split</div>
            <div className="value">二级分割线</div>
          </div>
        </div>
      </div>
      <div className="color-row">
        <div className="color-item link-color">
          <div className="color-item-content">
            <div className="name">@link-color</div>
            <div className="value">链接色</div>
          </div>
        </div>
        <div className="color-item disabled-color">
          <div className="color-item-content">
            <div className="name">@disabled-color</div>
            <div className="value">禁用色</div>
          </div>
        </div>
        <div className="color-item disabled-bg">
          <div className="color-item-content">
            <div className="name">@disabled-bg</div>
            <div className="value">禁用背景色</div>
          </div>
        </div>
        <div className="color-item processing-color">
          <div className="color-item-content">
            <div className="name">@processing-color</div>
            <div className="value">进度色</div>
          </div>
        </div>
        <div className="color-item icon-color">
          <div className="color-item-content">
            <div className="name">@icon-color</div>
            <div className="value">图标色</div>
          </div>
        </div>
        <div className="color-item icon-color-hover">
          <div className="color-item-content">
            <div className="name">@icon-color-hover</div>
            <div className="value">图标hover色</div>
          </div>
        </div>
      </div>
      <div className="color-row">
        <div className="color-item heading-color">
          <div className="color-item-content">
            <div className="name">@heading-color</div>
            <div className="value">标题色</div>
          </div>
        </div>
        <div className="color-item text-color">
          <div className="color-item-content">
            <div className="name">@text-color</div>
            <div className="value">文本色</div>
          </div>
        </div>
        <div className="color-item text-color-secondary">
          <div className="color-item-content">
            <div className="name">@text-color-secondary</div>
            <div className="value">二级文本色</div>
          </div>
        </div>
        <div className="color-item text-selection-bg">
          <div className="color-item-content">
            <div className="name">@text-selection-bg</div>
            <div className="value">文本选中色</div>
          </div>
        </div>
        <div className="color-item text-color-inverse">
          <div className="color-item-content">
            <div className="name">@text-color-inverse</div>
            <div className="value">反转文本色</div>
          </div>
        </div>
        <div className="color-item heading-color-dark">
          <div className="color-item-content">
            <div className="name">@heading-color-dark</div>
            <div className="value">深色标题色</div>
          </div>
        </div>
        <div className="color-item text-color-dark">
          <div className="color-item-content">
            <div className="name">@text-color-dark</div>
            <div className="value">深色文本色</div>
          </div>
        </div>
        <div className="color-item text-color-secondary-dark">
          <div className="color-item-content">
            <div className="name">@text-color-secondary-dark</div>
            <div className="value">深色二级文本色</div>
          </div>
        </div>
      </div>
    </div>
  </PreviewWrapper>
);

export default ColorPreview;
