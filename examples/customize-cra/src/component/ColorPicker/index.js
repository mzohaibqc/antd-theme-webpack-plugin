import React, { Component } from 'react';
import { Popover } from 'antd';
import { ChromePicker, SketchPicker } from 'react-color';
import './style.less';

const noop = () => { };

const pickers = {
  chrome: ChromePicker,
  sketch: SketchPicker
};

export default class ColorPicker extends Component {
  static defaultProps = {
    onChange: noop,
    onChangeComplete: noop,
    position: 'bottom'
  }

  constructor(props) {
    super();
    this.state = {
      color: props.color
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ color: nextProps.color });
  }

  handleChange = (color) => {
    this.setState({ color: color.hex });
    this.props.onChange(color.hex, color);
  };

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
    this.props.onChangeComplete(color.hex);
  };

  render() {
    const { small, type } = this.props;

    const Picker = pickers[type];

    const styles = {
      color: {
        width: small ? '16px' : '120px',
        height: small ? '16px' : '24px',
        borderRadius: '2px',
        background: this.state.color
      },
      swatch: {
        padding: '4px',
        background: '#fff',
        borderRadius: '2px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      }
    };

    const swatch = (
      <div style={styles.swatch}>
        <div style={styles.color} />
      </div>
    );
    const picker = (
      <Picker
        {...this.props}
        color={this.state.color}
        onChange={this.handleChange}
        onChangeComplete={this.handleChangeComplete}
      />
    );

    return (
      <Popover
        overlayClassName="color-popover"
        title={false}
        trigger="click"
        content={picker}
      >
        {swatch}
      </Popover>
    );
  }
}
