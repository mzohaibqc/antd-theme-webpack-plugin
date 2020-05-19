import React from 'react';
// import { Form } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
import { DownOutlined } from '@ant-design/icons';
import { Table, Switch, Radio, Divider, Form } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
// import './style.less';

const FormItem = Form.Item;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    render: text => <a>{text}</a>,
    // filterMultiple: false,
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) >= 0,
    sorter: (a, b) => {
      if (a === b) {
        return 0;
      } else if (a > b) {
        return -1;
      } else {
        return 1;
      }
    }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 70,
    render: text => <a>{text}</a>,
    onFilter: (value, record) => record.age.indexOf(value) >= 0,
    sorter: (a, b) => {
      if (a === b) {
        return 0;
      } else if (a > b) {
        return -1;
      } else {
        return 1;
      }
    }
  },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   key: 'address'
  // },
  {
    title: 'Action',
    key: 'action',
    width: 360,
    render: (text, record) => (
      <span>
        <a>{record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
        <Divider type="vertical" />
        <a className="ant-dropdown-link">
          More <DownOutlined />
        </a>
      </span>
    )
  }
];

const data = [];
for (let i = 1; i <= 5; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const scroll = { y: 240 };
const pagination = { position: 'bottom' };

class TablePreview extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: 'default',
    expandedRowRender,
    title: undefined,
    showHeader,
    footer,
    rowSelection: {},
    scroll: undefined,
    hasData: true
  };

  handleToggle = prop => (enable) => {
    this.setState({ [prop]: enable });
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  handleExpandChange = (enable) => {
    this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
  };

  handleTitleChange = (enable) => {
    this.setState({ title: enable ? title : undefined });
  };

  handleHeaderChange = (enable) => {
    this.setState({ showHeader: enable ? showHeader : false });
  };

  handleFooterChange = (enable) => {
    this.setState({ footer: enable ? footer : undefined });
  };

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

  handleScollChange = (enable) => {
    this.setState({ scroll: enable ? scroll : undefined });
  };

  handleDataChange = (hasData) => {
    this.setState({ hasData });
  };

  handlePaginationChange = (e) => {
    const { value } = e.target;
    this.setState({
      pagination: value === 'none' ? false : { position: value }
    });
  };


  render() {
    const { disabled } = this.props;
    const { state } = this;

    return (
      <PreviewWrapper id="Table" title="Table">
        <div className="components table">
          <div className="component-row">
            <div className="components-table-demo-control-bar">
              <Form layout="inline">
                <FormItem label="Bordered">
                  <Switch size="small" checked={state.bordered} onChange={this.handleToggle('bordered')} />
                </FormItem>
                <FormItem label="loading">
                  <Switch size="small" checked={state.loading} onChange={this.handleToggle('loading')} />
                </FormItem>
                <FormItem label="Title">
                  <Switch size="small" checked={!!state.title} onChange={this.handleTitleChange} />
                </FormItem>
                <FormItem label="Column Header">
                  <Switch size="small" checked={!!state.showHeader} onChange={this.handleHeaderChange} />
                </FormItem>
                <FormItem label="Footer">
                  <Switch size="small" checked={!!state.footer} onChange={this.handleFooterChange} />
                </FormItem>
                <FormItem label="Expandable">
                  <Switch size="small" checked={!!state.expandedRowRender} onChange={this.handleExpandChange} />
                </FormItem>
                <FormItem label="Checkbox">
                  <Switch size="small" checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
                </FormItem>
                <FormItem label="Fixed Header">
                  <Switch size="small" checked={!!state.scroll} onChange={this.handleScollChange} />
                </FormItem>
                <FormItem label="Has Data">
                  <Switch size="small" checked={!!state.hasData} onChange={this.handleDataChange} />
                </FormItem>
                <FormItem label="Size">
                  <Radio.Group size="small" value={state.size} onChange={this.handleSizeChange}>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="middle">Middle</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                  </Radio.Group>
                </FormItem>
                <FormItem label="Pagination">
                  <Radio.Group
                    size="small"
                    value={state.pagination ? state.pagination.position : 'none'}
                    onChange={this.handlePaginationChange}
                  >
                    <Radio.Button value="top">Top</Radio.Button>
                    <Radio.Button value="bottom">Bottom</Radio.Button>
                    <Radio.Button value="both">Both</Radio.Button>
                    <Radio.Button value="none">None</Radio.Button>
                  </Radio.Group>
                </FormItem>
              </Form>
            </div>
          </div>
          <div className="component-row">
            <Table disabled={disabled} {...state} columns={columns} dataSource={state.hasData ? data : null} />
          </div>
        </div>
      </PreviewWrapper>
    );
  }
}

export default TablePreview;
