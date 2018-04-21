import React, { Component } from "react";
import ReactDOM from "react-dom";
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
  DatePicker
} from "antd";
import moment from "moment";
import "rc-color-picker/assets/index.css";

import VarColorPicker from "./VarColorPicker";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class App extends Component {
  constructor(props) {
    super(props);
    let vars = {
      "@primary-color": "#00375B",
      "@secondary-color": "#0000ff",
      "@text-color": "#000000",
      "@text-color-secondary": "#eb2f96",
      "@heading-color": "#fa8c16"
    };
    try {
      vars = JSON.parse(localStorage.getItem("app-theme"));
    } finally {
      this.state = { vars };
      window.less
        .modifyVars(vars)
        .then(() => {})
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

  render() {
    const colorPickers = Object.keys(this.state.vars).reduce(
      (prev, varName) => {
        prev[varName] = (
          <VarColorPicker
            key={varName}
            defaultColor={this.state.vars[varName]}
            varName={varName}
            onChangeComplete={this.onChangeComplete}
          />
        );
        return prev;
      },
      {}
    );
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
              <Sider width={200} style={{ background: "#fff" }}>
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
                          <Col xs={16}>Primary Color</Col>
                          <Col xs={8}>{colorPickers["@primary-color"]}</Col>
                          <Col xs={16}>Text Color</Col>
                          <Col xs={8}>{colorPickers["@text-color"]}</Col>
                          <Col xs={16}>Text Secondary Color</Col>
                          <Col xs={8}>
                            {colorPickers["@text-color-secondary"]}
                          </Col>
                          <Col xs={16}>Headings Color</Col>
                          <Col xs={8}>{colorPickers["@heading-color"]}</Col>
                          <Col xs={16}>Custom Color Variable</Col>
                          <Col xs={8}>{colorPickers["@secondary-color"]}</Col>
                          <Col xs={24}>
                            <Button
                              type="primary"
                              onClick={() => this.handleColorChange()}
                            >
                              Change Theme
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
                            <Button type="default">Cancel</Button>{" "}
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>
                          </FormItem>
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
ReactDOM.render(<App />, document.getElementById("root"));
