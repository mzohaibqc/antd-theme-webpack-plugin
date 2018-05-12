import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Icon,
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
  Progress
} from "antd";
import moment from "moment";

import ColorPicker from "./ColorPicker";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class App extends Component {
  constructor(props) {
    super(props);
    let initialValue = {
      '@primary-color': '#1987a7',
      '@secondary-color': '#0000ff',
      '@text-color': '#000000',
      '@text-color-secondary': '#eb2f96',
      '@heading-color': '#fa8c16',
      '@layout-header-background': '#b36e94',
      '@btn-primary-bg': '#397dcc'
    };
    let vars = {};

    try {
      vars = Object.assign({}, initialValue, JSON.parse(localStorage.getItem('app-theme')));
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
    this.setState({ vars });
  };
  handleColorChange = (varname, color) => {
    const { vars } = this.state;
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

  getColorPicker = (varName) => (
    <Fragment key={varName}>
      <Col xs={20}>{varName}</Col>
      <Col xs={4}>
        <ColorPicker
          type="sketch"
          small
          color={this.state.vars[varName]}
          position="bottom"
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
            '#EB2F96',
          ]}
          onChangeComplete={color => this.handleColorChange(varName, color)}
        />
      </Col>
    </Fragment>
  )
  resetTheme = () => {
    localStorage.setItem('app-theme', '{}');
    this.setState({ vars: this.state.initialValue });
    window.less
      .modifyVars(this.state.initialValue)
      .catch(error => {
        message.error(`Failed to reset theme`);
      });
  }

  render() {
    const colorPickers = Object.keys(this.state.vars).map(varName => this.getColorPicker(varName));
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    return (
      <div className="App">
        <Row>
          <Layout>
            <Header className="header">
              <Row type="flex">
                <Col xs={24} sm={6}>
                  <div className="logo">Live Theme</div>
                </Col>
                <Col xs={0} sm={18}>
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    style={{ lineHeight: "64px" }}
                  >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                  </Menu>
                </Col>
              </Row>
            </Header>
            <Layout>
              <Sider width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="user" />subnav 1
                      </span>
                    }
                  >
                    <Menu.Item key="1">option1</Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="laptop" />subnav 2
                      </span>
                    }
                  >
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    title={
                      <span>
                        <Icon type="notification" />subnav 3
                      </span>
                    }
                  >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                  }}
                >
                  <Row>
                    <Col xs={24} sm={6}>
                      <Card title="Theme" style={{ width: 300 }}>
                        <Row>
                          {colorPickers}
                          {/* <Col xs={24}>
                            <Button
                              type="primary"
                              onClick={() => this.handleColorChange()}
                            >
                              Change Theme
                            </Button>
                          </Col> */}
                          <Col xs={24} style={{ marginTop: '10px' }}>
                            <Button
                              type="primary"
                              onClick={this.resetTheme}
                            >
                              Reset Theme
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col xs={24} sm={{ span: 15, offset: 3 }}>
                      <Form onSubmit={this.handleSubmit}>
                        <Col xs={24} sm={12}>
                          <FormItem
                            {...formItemLayout}
                            label="Select[multiple]"
                          >
                            {getFieldDecorator("select-multiple", {
                              initialValue: ["red"],
                              rules: [
                                {
                                  required: true,
                                  message:
                                    "Please select your favourite colors!",
                                  type: "array"
                                }
                              ]
                            })(
                              <Select
                                mode="multiple"
                                placeholder="Please select favourite colors"
                              >
                                <Option value="red">Red</Option>
                                <Option value="green">Green</Option>
                                <Option value="blue">Blue</Option>
                              </Select>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout} label="Switch">
                            {getFieldDecorator("switch", {
                              valuePropName: "checked",
                              initialValue: true
                            })(<Switch />)}
                          </FormItem>

                          <FormItem {...formItemLayout} label="Radio.Group">
                            {getFieldDecorator("radio-group", {
                              initialValue: 1
                            })(
                              <RadioGroup>
                                <Radio value={1}>A</Radio>
                                <Radio value={2}>B</Radio>
                                <Radio value={3}>C</Radio>
                                <Radio value={4}>D</Radio>
                              </RadioGroup>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout} label="Radio.Button">
                            {getFieldDecorator("radio-button", {
                              initialValue: "a"
                            })(
                              <RadioGroup>
                                <RadioButton value="a">item 1</RadioButton>
                                <RadioButton value="b">item 2</RadioButton>
                                <RadioButton value="c">item 3</RadioButton>
                              </RadioGroup>
                            )}
                          </FormItem>
                          <Progress percent={60} />
                        </Col>
                        <Col xs={24} sm={12}>
                          <FormItem {...formItemLayout} label="Date">
                            {getFieldDecorator("date", {
                              initialValue: moment()
                            })(<DatePicker />)}
                          </FormItem>
                          <FormItem {...formItemLayout} label="Upload">
                            {getFieldDecorator("upload", {
                              valuePropName: "fileList",
                              getValueFromEvent: this.normFile
                            })(
                              <Upload
                                name="logo"
                                action="/upload.do"
                                listType="picture"
                              >
                                <Button>
                                  <Icon type="upload" /> Click to upload
                                </Button>
                              </Upload>
                            )}
                          </FormItem>
                          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="default">Cancel</Button>
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>
                          </FormItem>
                          <Row type="flex" justify="center" className="secondary-color">
                            color : @secondary-color;
                          </Row>
                        </Col>
                      </Form>
                    </Col>
                  </Row>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Row>
      </div>
    );
  }
}

App = Form.create()(App);
export default App;
