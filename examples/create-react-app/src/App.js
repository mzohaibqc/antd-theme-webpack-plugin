import React, { Component } from 'react';
import {
  Row, Col, Icon,
  Breadcrumb, Menu, Layout
} from 'antd';
import 'rc-color-picker/assets/index.css';

import Form from './Form';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  state = { primary: '#00375B', secondary: '#4D4D4D' }

  render() {
    return (
      <div className="App">
        <Row>
          <Layout>
            <Header className="header">
              <Row type="flex">
                <Col xs={24} sm={6}>
                  <div className="logo" >Live Theme</div>
                </Col>
                <Col xs={0} sm={18}>
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                  >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                  </Menu>
                </Col>
              </Row>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                    <Menu.Item key="1">option1</Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                  <Row>
                    <Col xs={24} >
                      <Form />
                    </Col>
                  </Row >
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Row>
      </div >
    );
  }
}

export default App;
