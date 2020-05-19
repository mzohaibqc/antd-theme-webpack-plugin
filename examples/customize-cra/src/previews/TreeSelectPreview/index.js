import React from 'react';
import { TreeSelect } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const { TreeNode, SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0'
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1'
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2'
      }
    ]
  }
];

const TreeSelectPreview = ({ size, disabled }) => (
  <PreviewWrapper id="TreeSelect" title="TreeSelect">
    <div className="components input">
      <div className="component-row">
        <TreeSelect
          size={size}
          disabled={disabled}
          showSearch
          style={{ width: 300 }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
        >
          <TreeNode title="parent 1" key="0-1">
            <TreeNode title="parent 1-0" key="0-1-1">
              <TreeNode title="my leaf" key="random" />
              <TreeNode title="your leaf" key="random1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="random2">
              <TreeNode title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </div>
      <div className="component-row">
        <TreeSelect
          size={size}
          disabled={disabled}
          showSearch
          style={{ width: 300 }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          multiple
          treeDefaultExpandAll
        >
          <TreeNode title="parent 1" key="0-1">
            <TreeNode title="parent 1-0" key="0-1-1">
              <TreeNode title="my leaf" key="random" />
              <TreeNode title="your leaf" key="random1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="random2">
              <TreeNode title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </div>
      <div className="component-row">
        <TreeSelect
          size={size}
          disabled={disabled}
          treeData={treeData}
          treeCheckable
          showCheckedStrategy={SHOW_PARENT}
          style={{
            width: 300
          }}
        />
      </div>
    </div>
  </PreviewWrapper>
);

export default TreeSelectPreview;
