import React from 'react';
import { DatePicker } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const DatePickerPreview = ({ size, disabled }) => (
  <PreviewWrapper id="DatePicker" title="DatePicker">
    <div className="components input">
      <div className="component-row">
        <DatePicker disabled={disabled} size={size} />
      </div>
      <div className="component-row">
        <MonthPicker placeholder="Select month" disabled={disabled} size={size} />
      </div>
      <div className="component-row">
        <RangePicker disabled={disabled} size={size} />
      </div>
      <div className="component-row">
        <WeekPicker placeholder="Select week" disabled={disabled} size={size} />
      </div>
    </div>
  </PreviewWrapper>
);

export default DatePickerPreview;
