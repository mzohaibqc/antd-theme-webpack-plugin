import React, { Component } from 'react';
import ColorPicker from 'rc-color-picker';

class VarColorPicker extends Component {
  state = { color: this.props.defaultColor }
  handleChange = ({ color }) => {
    this.setState({ color });
    this.props.onChangeComplete(this.props.varName, color);
  };

  render() {
    return (
      <ColorPicker
        animation="slide-up"
        color={this.state.color}
        defaultColor={this.props.defaultColor}
        onClose={this.handleChange}
        placement="bottomRight"
      />
    );
  }
}

export default VarColorPicker;
