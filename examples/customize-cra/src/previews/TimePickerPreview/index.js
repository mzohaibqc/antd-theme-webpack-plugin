import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const TimePickerPreview = ({ size, disabled }) => (
  <PreviewWrapper id="TimePicker" title="TimePicker">
    <div className="components">
      <div className="component-row">
        <TimePicker size={size} disabled={disabled} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
      </div>
    </div>
  </PreviewWrapper>
);

export default TimePickerPreview;
