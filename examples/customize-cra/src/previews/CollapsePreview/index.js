import React from 'react';
import { Collapse } from 'antd';
import PreviewWrapper from '../PreviewWrapper';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const text1 = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const CollapsePreview = ({ disabled }) => (
  <PreviewWrapper id="Collapse" title="Collapse">
    <div className="components">
      <div className="component-row">
        <Collapse defaultActiveKey={['1']} onChange={() => { }}>
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3" disabled>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
      <div className="component-row">
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="This is panel header 1" key="1" disabled={disabled}>
            <p>{text1}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2" disabled={disabled}>
            <p>{text1}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3" disabled={disabled}>
            <p>{text1}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  </PreviewWrapper>
);

export default CollapsePreview;
