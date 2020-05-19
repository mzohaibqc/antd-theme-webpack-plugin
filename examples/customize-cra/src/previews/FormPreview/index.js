import React, { Component } from 'react';
import moment from 'moment';
// import { Form } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
import { UploadOutlined } from '@ant-design/icons';
import { Select, Switch, Radio, Button, Upload, DatePicker, Progress, Input, Form } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
import './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ExampleForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleMenuThemeChange = (value) => {
    const { onMenuThemeChange } = this.props;
    typeof onMenuThemeChange === 'function' && onMenuThemeChange(value);
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  renderForm() {
    const { size, disabled } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    };
    return (
      <Form
        className="example-form"
        colon={false}
        onSubmit={this.handleSubmit}
      >
        <FormItem
          {...formItemLayout}
          label="Menu Theme"
          name="menu-theme"
          initialValue={this.props.menuTheme}
          rules={[
            {
              required: true,
              message:
                'Please select your favourite menu theme!',
              type: 'string'
            }
          ]}
        >
          <Select
            size={size}
            disabled={disabled}
            style={{ width: 300 }}
            onChange={this.handleMenuThemeChange}
          >
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Select[multiple]"
          name="select-multiple"
          initialValue={['red']}
          rules={[
            {
              required: true,
              message:
                'Please select your favourite colors!',
              type: 'array'
            }
          ]}
        >
          <Select
            size={size}
            disabled={disabled}
            mode="multiple"
            placeholder="Please select favourite colors"
            style={{ width: 300 }}
          >
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Switch" name="switch" valuePropName="checked" initialValue={true} >
          <Switch size={size} disabled={disabled} />
        </FormItem>
        <FormItem {...formItemLayout} label="名称">
          <Input size={size} disabled={disabled} placeholder="Name" style={{ width: 300 }} />
        </FormItem>
        <FormItem {...formItemLayout} label="Radio.Group" name="radio-group" initialValue={1} >
          <RadioGroup size={size} disabled={disabled}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="Radio.Button" name="radio-button" initialValue="a">
          <RadioGroup size={size} disabled={disabled}>
            <RadioButton value="a">item 1</RadioButton>
            <RadioButton value="b">item 2</RadioButton>
            <RadioButton value="c">item 3</RadioButton>
          </RadioGroup>
        </FormItem>
        <FormItem style={{ marginTop: 30 }} wrapperCol={{ span: 12, offset: formItemLayout.labelCol.span }}>
          <Progress percent={60} size={size} disabled={disabled} />
        </FormItem>
        <FormItem {...formItemLayout} label="Date" name="date" initialValue={moment()}>
          <DatePicker size={size} disabled={disabled} />
        </FormItem>
        <FormItem {...formItemLayout} label="Upload" name="upload" valuePropName="fileList" getValueFromEvent={this.normFile} >
          <Upload
            name="logo"
            action="/upload.do"
            listType="picture"
          >
            <Button size={size} disabled={disabled}>
              <UploadOutlined /> Click to upload
              </Button>

            <a href="#" style={{ marginLeft: 20 }}>上传文件</a>
          </Upload>
        </FormItem>
        {/* <FormItem {...formItemLayout} label=" ">
          服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。
        </FormItem> */}
        <FormItem wrapperCol={{ span: 12, offset: formItemLayout.labelCol.span }}>
          <Button size={size} disabled={disabled} style={{ marginRight: 10 }}>Reset</Button>
          <Button size={size} disabled={disabled} type="default" style={{ marginRight: 10 }}>Cancel</Button>
          <Button size={size} disabled={disabled} type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }

  render() {
    return (
      <PreviewWrapper id="Form" title="Form">
        <div className="components">
          <div className="component-row">
            {this.renderForm()}
          </div>
        </div>
      </PreviewWrapper>
    );
  }
}

export default ExampleForm;
