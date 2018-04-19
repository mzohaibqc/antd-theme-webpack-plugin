import React, { Component } from 'react';
import {
  Form, Select, Switch, Radio, Card, message,
  Button, Upload, Icon, DatePicker, Row, Col
} from 'antd';

import moment from 'moment';
import VarColorPicker from './VarColorPicker';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class MyForm extends Component {

  state = {
    vars: {
      '@primary-color': '#00375B',
      '@secondary-color': '#0000ff',
      '@text-color': '#000000',
      '@text-color-secondary': '#eb2f96',
      '@heading-color': '#fa8c16'
    }
  }

  // componentDidMount = () => {
  //   let vars = {
  //     '@primary-color': '#00375B',
  //     '@secondary-color': '#0000ff',
  //     '@text-color': '#4D4D4D',
  //     '@text-color-secondary': '#eb2f96',
  //     '@heading-color': '#fa8c16'
  //   };
  //   try {
  //     vars = JSON.parse(localStorage.getItem('app-theme'));
  //   } finally {
  //     window.less.modifyVars(vars).then(() => {
  //       this.setState({ vars });
  //     }).catch(error => {
  //       this.setState({ vars });
  //       message.error(`Failed to update theme`);
  //     });
  //   }
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  onChangeComplete = (varName, color) => {
    const { vars } = this.state;
    vars[varName] = color;
    this.setState({ vars });
  }
  handleColorChange = (varname, color) => {
    const { vars } = this.state;
    if (varname) vars[varname] = color;
    console.log(vars);
    window.less.modifyVars(vars).then(() => {
      // message.success(`Theme updated successfully`);
      this.setState({ vars });
      localStorage.setItem('app-theme', JSON.stringify(vars));
    }).catch(error => {
      message.error(`Failed to update theme`);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const colorPickers = Object.keys(this.state.vars).reduce((prev, varName) => {
      prev[varName] = <VarColorPicker key={varName} defaultColor={this.state.vars[varName]} varName={varName} onChangeComplete={this.onChangeComplete} />
      return prev;
    }, {});
    return (
      <Form onSubmit={this.handleSubmit}>
        <Col xs={{ span: 18, offset: 6 }}>
          (Color based on your own custom variables)
          <h3 className="secondary">Secondary Color</h3>
        </Col>
        <FormItem
          {...formItemLayout}
          label="Colors"
        >
          <Card title="Theme" style={{ width: 300 }}>
            <Row>
              <Col xs={16}>Primary Color</Col>
              <Col xs={8}>{colorPickers['@primary-color']}</Col>
              <Col xs={16}>Text Color</Col>
              <Col xs={8}>{colorPickers['@text-color']}</Col>
              <Col xs={16}>Text Secondary Color</Col>
              <Col xs={8}>{colorPickers['@text-color-secondary']}</Col>
              <Col xs={16}>Headings Color</Col>
              <Col xs={8}>{colorPickers['@heading-color']}</Col>
              <Col xs={16}>Custom Color Variable</Col>
              <Col xs={8}>{colorPickers['@secondary-color']}</Col>
              <Col xs={24}><Button type="primary" onClick={() => this.handleColorChange()}>Change Theme</Button></Col>
            </Row>
          </Card>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Select[multiple]"
        >
          {getFieldDecorator('select-multiple', {
            initialValue: ['red'],
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors" >
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Switch"
        >
          {getFieldDecorator('switch', { valuePropName: 'checked', initialValue: true, })(
            <Switch />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Radio.Group"
        >
          {getFieldDecorator('radio-group', { initialValue: 1 })(
            <RadioGroup>
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Radio.Button"
        >
          {getFieldDecorator('radio-button', { initialValue: 'a' })(
            <RadioGroup>
              <RadioButton value="a">item 1</RadioButton>
              <RadioButton value="b">item 2</RadioButton>
              <RadioButton value="c">item 3</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Date"
        >
          {getFieldDecorator('date', {
            initialValue: moment(),
          })(
            <DatePicker />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Upload"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
                </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="default" >Cancel</Button>  <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(MyForm);
