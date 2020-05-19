import React from 'react';
import { Pagination } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const PaginationPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Pagination" title="Pagination">
    <div className="components progress">
      <div className="component-row">
        <Pagination size={size} disabled={disabled} defaultCurrent={1} total={50} />
      </div>
      <div className="component-row">
        <Pagination
          size={size}
          disabled={disabled}
          showSizeChanger
          defaultCurrent={3}
          total={500}
        />
      </div>
      <div className="component-row">
        <Pagination size={size} disabled={disabled} total={50} showSizeChanger showQuickJumper />
      </div>
      <div className="component-row">
        <Pagination size={size} disabled={disabled} simple defaultCurrent={2} total={50} />
      </div>
      <div className="component-row">
        <Pagination size="small" total={50} />
      </div>
      <div className="component-row">
        <Pagination size="small" total={50} showSizeChanger showQuickJumper />
      </div>
      <div className="component-row">
        <Pagination size="small" total={50} />
      </div>
    </div>
  </PreviewWrapper>
);

export default PaginationPreview;
