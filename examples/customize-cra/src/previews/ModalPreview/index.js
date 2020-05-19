import React from 'react';
import { Modal, Button } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const { confirm } = Modal;

function info() {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

function success() {
  Modal.success({
    title: 'This is a success message',
    content: 'some messages...some messages...',
  });
}

function error() {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
}

function warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}

class ModalPreview extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { size, disabled } = this.props;

    return (
      <PreviewWrapper id="Modal" title="Modal">
        <div className="components">
          <div className="component-row">
            <div className="component-col">
              <Button type="primary" onClick={this.showModal} size={size} disabled={disabled}>
                Open Modal
              </Button>
            </div>
            <div className="component-col">
              <Button onClick={this.showConfirm} size={size} disabled={disabled}>Confirm</Button>
            </div>
            <div className="component-col">
              <Button onClick={this.showDeleteConfirm} type="dashed" size={size} disabled={disabled}>
                Delete
              </Button>
            </div>
          </div>
          <div className="component-row">
            <div className="component-col">
              <Button onClick={info} size={size} disabled={disabled}>Info</Button>
            </div>
            <div className="component-col">
              <Button onClick={success} size={size} disabled={disabled}>Success</Button>
            </div>
            <div className="component-col">
              <Button onClick={error} size={size} disabled={disabled}>Error</Button>
            </div>
            <div className="component-col">
              <Button onClick={warning} size={size} disabled={disabled}>Warning</Button>
            </div>
          </div>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </PreviewWrapper>
    );
  }
}

export default ModalPreview;
