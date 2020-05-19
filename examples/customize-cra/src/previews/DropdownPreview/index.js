import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const DropdownPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Dropdown" title="Dropdown">
    <div className="components dropdown">
      <div className="component-row">
        <div className="component-col">
          <Dropdown overlay={menu} size={size} disabled={disabled}>
            <a className="ant-dropdown-link" href="#">
              Hover me <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div className="component-col">
          <Dropdown.Button overlay={menu} icon={<UserOutlined />} size={size} disabled={disabled}>
            Dropdown
          </Dropdown.Button>
        </div>
      </div>
    </div>
  </PreviewWrapper>
);

export default DropdownPreview;
