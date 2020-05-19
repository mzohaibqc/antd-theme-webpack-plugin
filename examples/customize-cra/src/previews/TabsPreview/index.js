import React from 'react';
import { Tabs } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const { TabPane } = Tabs;

const TabsPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Tabs" title="Tabs">
    <div className="components tabs">
      <div className="component-row">
        <Tabs
          size={size}
          // disabled={disabled}
          defaultActiveKey="1"
        >
          <TabPane tab="Tab 1" key="1" disabled={disabled}>
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2" disabled={disabled}>
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3" disabled={disabled}>
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
      <div className="component-row">
        <Tabs
          size={size}
          // disabled={disabled}
          type="card"
        >
          <TabPane tab="Tab 1" key="1" disabled={disabled}>
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2" disabled={disabled}>
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3" disabled={disabled}>
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  </PreviewWrapper>
);

export default TabsPreview;
