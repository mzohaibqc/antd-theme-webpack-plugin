import React, { Component } from "react";
import {
  Row,
  Col,
  Layout,
  Form,
  Select,
  message,
  Button,
  Spin,
} from "antd";
import {
  ColorPreview,
  TypographyPreview,
  ButtonPreview,
  RadioPreview,
  CheckboxPreview,
  InputPreview,
  SwitchPreview,
  SliderPreview,
  DatePickerPreview,
  RatePreview,
  TransferPreview,
  TablePreview,
  TagPreview,
  ProgressPreview,
  TreePreview,
  PaginationPreview,
  BadgePreview,
  AlertPreview,
  SpinPreview,
  MessagePreview,
  NotificationPreview,
  TabsPreview,
  MenuPreview,
  TooltipPreview,
  PopoverPreview,
  CardPreview,
  CarouselPreview,
  CollapsePreview,
  AvatarPreview,
  DropdownPreview,
  StepPreview,
  CascaderPreview,
  SelectPreview,
  TreeSelectPreview,
  TimePickerPreview,
  CalendarPreview,
  ListPreview,
  TimelinePreview,
  PopconfirmPreview,
  ModalPreview,
  FormPreview
} from './previews';


import {
  MenuFoldOutlined, MenuUnfoldOutlined, CloseOutlined
} from '@ant-design/icons';

import Navbar from './Navbar';
import ColorPicker from "./ColorPicker";
import darkVars from './dark.json';
import lightVars from './light.json';
import './styles/main.less';

// eslint-disable jsx-a11y/anchor-has-content
const { Footer, Content, Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class App extends Component {
  constructor(props) {
    super(props);
    let initialValue = lightVars;
    let vars = {};
    let themeName =  localStorage.getItem("theme-name") || 'light';

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
      this.state = {
        themeApplied: false,
        vars, initialValue, size: 'default',
        disabled: false,
        themeName
      };
      window.less
        .modifyVars(vars)
        .then(() => { 
          this.setState({ themeApplied: true });
        })
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
    localStorage.setItem("theme-name", 'light');
    this.setState({ themeName: 'light' });
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
    const { collapsed, size, disabled, themeApplied } = this.state;
    const colorPickerOptions = ["@primary-color", "@secondary-color", "@text-color", "@text-color-secondary", "@heading-color", "@layout-header-background", "@btn-primary-bg"];
    // const colorPickers = Object.keys(this.state.vars).filter(name => colorPickerOptions.indexOf(name) > -1).map((varName, index) =>
    const colorPickers = colorPickerOptions.map((varName, index) =>
      this.getColorPicker(varName, index > 3 ? 'top' : 'right')
    );

    const themeLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    if (!themeApplied) {

      return (
        <Spin size="large">
          <Layout className="app" />
        </Spin>
      )
    }
    return (
      <Layout className="app">
        <Navbar />
        <Content className="content">
          <Layout>
            <Sider
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
                    className="ant-col ant-col-xs-22 ant-col-offset-1 choose-theme"
                  >

                    <Select
                      placeholder="Please select theme"
                      value={this.state.themeName}
                      onSelect={value => {
                        let vars = value === 'light' ? lightVars : darkVars;
                        vars = { ...vars, '@white': '#fff', '@black': '#000' };
                        this.setState({ vars, themeName: value });
                        this.setState({ vars });
                        localStorage.setItem("app-theme", JSON.stringify(vars));
                        localStorage.setItem("theme-name", value);
                        window.less.modifyVars(vars).catch(error => {
                          
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
            <Content id="preview-content">
              <div className="preview">
                <ColorPreview />
                <TypographyPreview />
                <ButtonPreview disabled={disabled} size={size} />
                <RadioPreview disabled={disabled} size={size} />
                <CheckboxPreview disabled={disabled} size={size} />
                <InputPreview disabled={disabled} size={size} />
                <SelectPreview disabled={disabled} size={size} />
                <TreeSelectPreview disabled={disabled} size={size} />
                <SwitchPreview disabled={disabled} size={size} />
                <SliderPreview disabled={disabled} size={size} />
                <DatePickerPreview disabled={disabled} size={size} />
                <TimePickerPreview disabled={disabled} size={size} />
                <RatePreview disabled={disabled} size={size} />
                <StepPreview disabled={disabled} size={size} />
                <CascaderPreview disabled={disabled} size={size} />
                <DropdownPreview disabled={disabled} size={size} />
                <TransferPreview disabled={disabled} size={size} />
                <FormPreview disabled={disabled} size={size} />
                <TablePreview disabled={disabled} size={size} />
                <PaginationPreview disabled={disabled} size={size} />
                <ProgressPreview disabled={disabled} size={size} />
                <TreePreview disabled={disabled} size={size} />
                <SpinPreview disabled={disabled} size={size} />
                <TabsPreview disabled={disabled} size={size} />
                <MenuPreview disabled={disabled} size={size} />
                <CardPreview disabled={disabled} size={size} />
                <CarouselPreview disabled={disabled} size={size} />
                <CollapsePreview disabled={disabled} size={size} />
                <AvatarPreview disabled={disabled} size={size} />
                <CalendarPreview disabled={disabled} size={size} />
                <ListPreview disabled={disabled} size={size} />
                <TimelinePreview disabled={disabled} size={size} />
                <TagPreview disabled={disabled} size={size} />
                <BadgePreview disabled={disabled} size={size} />
                <AlertPreview disabled={disabled} size={size} />
                <MessagePreview disabled={disabled} size={size} />
                <NotificationPreview disabled={disabled} size={size} />
                <TooltipPreview disabled={disabled} size={size} />
                <PopoverPreview disabled={disabled} size={size} />
                <PopconfirmPreview disabled={disabled} size={size} />
                <ModalPreview disabled={disabled} size={size} />
              </div>
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
