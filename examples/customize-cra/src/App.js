import React, { Component } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Menu,
  Layout,
  Form,
  Select,
  Switch,
  Radio,
  Card,
  message,
  Button,
  Upload,
  DatePicker,
  Progress,
  Dropdown,
  Pagination,
  Checkbox,
  Badge,
  List,
  Timeline,
  Avatar
} from "antd";

import {
  ClockCircleOutlined, DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, CloseOutlined
} from '@ant-design/icons';

import Navbar from './Navbar';
import ColorPicker from "./ColorPicker";
import darkVars from './dark.json';
import lightVars from './light.json';
import './styles/main.less';

const { Footer, Content, Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class App extends Component {
  constructor(props) {
    super(props);
    let initialValue = lightVars;
    let vars = {};

    try {
      vars = localStorage.getItem("app-theme");
      if (!vars) {
        vars = initialValue;
      } else {
        vars = Object.assign(
          {},
          JSON.parse(vars)
        );
      }

    } catch (e) {
      vars = initialValue;
    } finally {
      this.state = { vars, initialValue };
      window.less
        .modifyVars(vars)
        .then(() => { })
        .catch(error => {
          message.error(`Failed to update theme`);
        });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  onChangeComplete = (varName, color) => {
    const { vars } = this.state;
    vars[varName] = color;
    this.setState({ vars: { ...vars } });
  };
  handleColorChange = (varname, color) => {
    const vars = { ...this.state.vars };
    if (varname) vars[varname] = color;
    console.log(vars);
    window.less
      .modifyVars(vars)
      .then(() => {
        // message.success(`Theme updated successfully`);
        this.setState({ vars });
        localStorage.setItem("app-theme", JSON.stringify(vars));
      })
      .catch(error => {
        message.error(`Failed to update theme`);
      });
  };

  getColorPicker = (varName, position) => (
    <Row className="color-row" key={`${varName}-${this.state.vars[varName]}`}>
      <Col xs={4} className="color-palette">
        <ColorPicker
          type="sketch"
          small
          color={this.state.vars[varName]}
          position={position || 'right'}
          presetColors={[
            '#F5222D',
            '#FA541C',
            '#FA8C16',
            '#FAAD14',
            '#FADB14',
            '#A0D911',
            '#52C41A',
            '#13C2C2',
            '#1890FF',
            '#2F54EB',
            '#722ED1',
            '#EB2F96'
          ]}
          onChangeComplete={color => this.handleColorChange(varName, color)}
        />
      </Col>
      <Col className="color-name" xs={20}>{varName}</Col>
    </Row>
  );
  resetTheme = () => {
    localStorage.setItem("app-theme", "{}");
    this.setState({ vars: this.state.initialValue });
    window.less.modifyVars(this.state.initialValue).catch(error => {
      message.error(`Failed to reset theme`);
    });
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
    console.log('onCollapse', collapsed);
  }

  render() {
    const { collapsed } = this.state;
    const colorPickerOptions = ["@primary-color", "@secondary-color", "@text-color", "@text-color-secondary", "@heading-color", "@layout-header-background", "@btn-primary-bg"];
    // const colorPickers = Object.keys(this.state.vars).filter(name => colorPickerOptions.indexOf(name) > -1).map((varName, index) =>
    const colorPickers = colorPickerOptions.map((varName, index) =>
      this.getColorPicker(varName, index > 3 ? 'top' : 'right')
    );
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const themeLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }

    const listData = [
      {
        title: "Ant Design Title 1"
      },
      {
        title: "Ant Design Title 2"
      },
      {
        title: "Ant Design Title 3"
      },
      {
        title: "Ant Design Title 4"
      }
    ];

    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout className="app">
        <Navbar />
        <Content className="content">
          <Layout>
            <Sider
              theme="light"
              breakpoint="lg"
              collapsedWidth={40}
              collapsed={collapsed}
              width={300}
              onBreakpoint={broken => {
                console.log(broken);
                this.onCollapse(broken);
              }}
              onCollapse={this.onCollapse}
            >
              <Row className="theme-heading">
                {collapsed ? <MenuUnfoldOutlined onClick={() => this.onCollapse(!collapsed)} /> : <MenuFoldOutlined onClick={() => this.onCollapse(!collapsed)} />}
              </Row>
              <Row className="theme-selector-dropdown">
                {!collapsed && (
                  <Col span={22} offset={1}><FormItem
                    {...themeLayout}
                    label="Choose Theme"
                    className="ant-col ant-col-xs-22 ant-col-offset-1"
                  >

                    <Select
                      placeholder="Please select theme"
                      onSelect={value => {
                        let vars = value === 'light' ? lightVars : darkVars;
                        vars = { ...vars, '@white': '#fff', '@black': '#000' };
                        this.setState({ vars });
                        window.less.modifyVars(vars).catch(error => {
                          message.error(`Failed to reset theme`);
                          this.setState({ vars });
                          localStorage.setItem("app-theme", JSON.stringify(vars));
                        });
                      }}
                    >
                      <Option value="light">Light</Option>
                      <Option value="dark">Dark</Option>
                    </Select>
                  </FormItem>
                  </Col>
                )}
              </Row>

              {colorPickers}
              <Row type="flex" justify="center">
                <Button type="primary" onClick={this.resetTheme} title="Reset Theme">
                  {!collapsed ? "Reset Theme" : <CloseOutlined />}
                </Button>
              </Row>
              
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Row>
                <Col xs={24} sm={6}>
                  <Card
                    title="Default size card"
                    extra={<a href="#">More</a>}
                    style={{ width: 300 }}
                  >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                  <Card
                    size="small"
                    title="Small size card"
                    extra={<a href="#">More</a>}
                    style={{ width: 300 }}
                  >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                </Col>
                <Col xs={24} sm={{ span: 15, offset: 3 }}>
                  <Form onSubmit={this.handleSubmit}>
                    <Col xs={24} sm={12}>
                      <FormItem
                        {...formItemLayout}
                        label="Select[multiple]"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please select your favourite colors!",
                            type: "array"
                          }
                        ]}
                      >
                        <Select
                          mode="multiple"
                          placeholder="Please select favourite colors"
                        >
                          <Option value="red">Red</Option>
                          <Option value="green">Green</Option>
                          <Option value="blue">Blue</Option>
                        </Select>
                      </FormItem>

                      <FormItem {...formItemLayout} label="Switch" valuePropName="checked">
                        <Switch />
                      </FormItem>

                      <FormItem {...formItemLayout} label="Radio.Group">
                        <RadioGroup>
                          <Radio value={1}>A</Radio>
                          <Radio value={2}>B</Radio>
                          <Radio value={3}>C</Radio>
                          <Radio value={4}>D</Radio>
                        </RadioGroup>
                      </FormItem>

                      <FormItem {...formItemLayout} label="Radio.Button">
                        <RadioGroup>
                          <RadioButton value="a">item 1</RadioButton>
                          <RadioButton value="b">item 2</RadioButton>
                          <RadioButton value="c">item 3</RadioButton>
                        </RadioGroup>
                      </FormItem>
                      <Progress percent={60} />
                    </Col>
                    <Col xs={24} sm={12}>
                      <FormItem {...formItemLayout} label="Date">
                        <DatePicker />
                      </FormItem>
                      <FormItem {...formItemLayout} label="Upload" valuePropName="fileList" getValueFromEvent={this.normFile}>
                        <Upload
                          name="logo"
                          action="/upload.do"
                          listType="picture"
                        >
                          <Button>
                            <Upload /> Click to upload
                                </Button>
                        </Upload>
                      </FormItem>
                      <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="default">Cancel</Button>
                        <Button type="primary" htmlType="submit">
                          Submit
                            </Button>
                      </FormItem>



                    </Col>
                  </Form>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="left"
                className="secondary-color"
              >
                <Col xs={24} sm={6}>
                  <Row
                    type="flex"
                    justify="left"
                    className="secondary-color"
                  >
                    <List
                      itemLayout="horizontal"
                      dataSource={listData}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={
                              <a href="https://ant.design">
                                {item.title}
                              </a>
                            }
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                          />
                        </List.Item>
                      )}
                    />
                  </Row>
                </Col>
                <Col xs={24} sm={6}>
                  <Row
                    type="flex"
                    justify="left"
                    className="secondary-color component-container"
                  >
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" href="#">
                        Hover me <DownOutlined />
                      </a>
                    </Dropdown>
                  </Row>
                  <Row
                    type="flex"
                    justify="left"
                    className="secondary-color component-container"
                  >
                    <Pagination defaultCurrent={1} total={50} />
                  </Row>
                  <Row
                    type="flex"
                    justify="left"
                    className="secondary-color component-container"
                  >
                    <Checkbox>Checkbox</Checkbox>
                  </Row>
                </Col>
                <Col xs={24} sm={6}>
                  <Row
                    type="flex"
                    justify="left"
                    className="secondary-color"
                  >
                    <div>
                      <Badge count={5}>
                        <a href="#" className="head-example" />
                      </Badge>
                      <Badge count={0} showZero>
                        <a href="#" className="head-example" />
                      </Badge>
                      <Badge
                        count={
                          <ClockCircleOutlined
                            style={{ color: "#f5222d" }}
                          />
                        }
                      >
                        <a href="#" className="head-example" />
                      </Badge>
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={24} lg={{ span: 9, offset: 3 }} style={{ marginTop: 15 }}>
                  <Timeline>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  </Timeline>
                </Col>
                <Col xs={24} lg={{ span: 12 }} style={{ marginTop: 15 }}>
                  <Timeline>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  </Timeline>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design Live Theme ©2018 Created by Zohaib Ijaz (mzohaibqc)
        </Footer>
      </Layout>
    );
  }
}

export default App;
