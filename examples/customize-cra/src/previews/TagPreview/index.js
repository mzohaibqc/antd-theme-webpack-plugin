import React from 'react';
import { Tag } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const TagPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Tag" title="Tag">
    <div className="components tag">
      <div className="component-row">
        <Tag className="component-col" size={size} disabled={disabled}>Tag 1</Tag>
        <Tag className="component-col" size={size} disabled={disabled}>
          <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
        </Tag>
        <Tag className="component-col" closable size={size} disabled={disabled}>
          Tag 2
        </Tag>
        <Tag className="component-col" closable size={size} disabled={disabled}>
          Prevent Default
        </Tag>
      </div>
      <div className="component-row">
        <Tag className="component-col" color="magenta">magenta</Tag>
        <Tag className="component-col" color="red">red</Tag>
        <Tag className="component-col" color="volcano">volcano</Tag>
        <Tag className="component-col" color="orange">orange</Tag>
        <Tag className="component-col" color="gold">gold</Tag>
        <Tag className="component-col" color="lime">lime</Tag>
        <Tag className="component-col" color="green">green</Tag>
        <Tag className="component-col" color="cyan">cyan</Tag>
      </div>
      <div className="component-row">
        <Tag color="#f50">#f50</Tag>
        <Tag color="#2db7f5">#2db7f5</Tag>
        <Tag color="#87d068">#87d068</Tag>
        <Tag color="#108ee9">#108ee9</Tag>
      </div>
    </div>
  </PreviewWrapper>
);

export default TagPreview;
