import React from 'react';

import {
  AppstoreOutlined,
  DesktopOutlined,
  InboxOutlined,
  MailOutlined,
  PieChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { Menu } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const { SubMenu } = Menu;

const MenuPreview = ({ size, disabled }) => (
  <PreviewWrapper id="Menu" title="Menu">
    <div className="components menu">
      <div className="component-row">
        <Menu mode="horizontal">
          <Menu.Item key="mail" size={size} disabled={disabled}>
            <MailOutlined />
            Navigation One
          </Menu.Item>
          <Menu.Item key="app" size={size} disabled={disabled}>
            <AppstoreOutlined />
            Navigation Two
          </Menu.Item>
          <SubMenu
            size={size}
            disabled={disabled}
            title={
              <span className="submenu-title-wrapper">
                <SettingOutlined />
                Navigation Three - Submenu
              </span>
            }
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1" size={size} disabled={disabled}>Option 1</Menu.Item>
              <Menu.Item key="setting:2" size={size} disabled={disabled}>Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3" size={size} disabled={disabled}>Option 3</Menu.Item>
              <Menu.Item key="setting:4" size={size} disabled={disabled}>Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="alipay" size={size} disabled={disabled}>
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Navigation Four - Link
            </a>
          </Menu.Item>
        </Menu>
      </div>
      <div className="component-row">
        <div className="component-col">
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <MailOutlined />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.ItemGroup key="g1" title="Item 1">
                <Menu.Item key="1" size={size} disabled={disabled}>Option 1</Menu.Item>
                <Menu.Item key="2" size={size} disabled={disabled}>Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g2" title="Item 2">
                <Menu.Item key="3" size={size} disabled={disabled}>Option 3</Menu.Item>
                <Menu.Item key="4" size={size} disabled={disabled}>Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <AppstoreOutlined />
                  <span>Navigation Two</span>
                </span>
              }
            >
              <Menu.Item key="5" size={size} disabled={disabled}>Option 5</Menu.Item>
              <Menu.Item key="6" size={size} disabled={disabled}>Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7" size={size} disabled={disabled}>Option 7</Menu.Item>
                <Menu.Item key="8" size={size} disabled={disabled}>Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <SettingOutlined />
                  <span>Navigation Three</span>
                </span>
              }
            >
              <Menu.Item key="9" size={size} disabled={disabled}>Option 9</Menu.Item>
              <Menu.Item key="10" size={size} disabled={disabled}>Option 10</Menu.Item>
              <Menu.Item key="11" size={size} disabled={disabled}>Option 11</Menu.Item>
              <Menu.Item key="12" size={size} disabled={disabled}>Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="component-col">
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="1" size={size} disabled={disabled}>
              <PieChartOutlined />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2" size={size} disabled={disabled}>
              <DesktopOutlined />
              <span>Option 2</span>
            </Menu.Item>
            <Menu.Item key="3" size={size} disabled={disabled}>
              <InboxOutlined />
              <span>Option 3</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <MailOutlined />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.Item key="5" size={size} disabled={disabled}>Option 5</Menu.Item>
              <Menu.Item key="6" size={size} disabled={disabled}>Option 6</Menu.Item>
              <Menu.Item key="7" size={size} disabled={disabled}>Option 7</Menu.Item>
              <Menu.Item key="8" size={size} disabled={disabled}>Option 8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <AppstoreOutlined />
                  <span>Navigation Two</span>
                </span>
              }
            >
              <Menu.Item key="9" size={size} disabled={disabled}>Option 9</Menu.Item>
              <Menu.Item key="10" size={size} disabled={disabled}>Option 10</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11" size={size} disabled={disabled}>Option 11</Menu.Item>
                <Menu.Item key="12" size={size} disabled={disabled}>Option 12</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
      </div>
    </div>
  </PreviewWrapper>
);

export default MenuPreview;
