// @search_form container
import './less';
import React, { Component, ProTypes } from 'react';
import { Row, Col, Button, Icon, Select, Input, Form, DatePicker } from '../../skit_ui';
const FormItem = Form.Item;
const Option = Select.Option;

import token from '../../utils/token';
import { connect } from 'react-redux';
import { fetchGet, fetchSelf } from '../../redux/api/common';
import { refrehTableAction } from '../../redux/actions';
import moment from 'moment';
class ConSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataForm: [],
            isFilter: true
        }
    }

    componentDidMount() {
        const { data, dataFilter } = this.props;
        let {searchObj, selectUrl} = dataFilter;
        let dataForm 
        let tempList = {};
        if(selectUrl){
            // 先同步赋一次值 防止 报错
            dataForm =  dataFilter.filters({}, searchObj);
            fetchSelf('GET', selectUrl).then((res)=>{
                console.log(res);
                if(res.status === 1){
                    tempList = res.data;
                    dataForm =  dataFilter.filters(tempList, searchObj);
                    this.setState({
                        dataForm,
                        isFilter: false
                    });
                }
            })
        }else{
            dataForm =  dataFilter.filters({}, searchObj);
            this.setState({
                dataForm,
                isFilter: false
            });
        }
      
    }
    componentWillReceiveProps(nextProps) {
       
    }
    //搜索触发
    handleSearch = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, values) => {
            if(values.create_time){
                values.create_time = moment(values.create_time).format('YYYY-MM-DD');
            }
            dispatch(refrehTableAction(values))
        });
    }

    //重置
    handleReset = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.resetFields();
        this.props.form.validateFields((err, values) => {
            dispatch(refrehTableAction())
        });
    }

    //渲染所有搜索项
    getFields(dataForm) {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        dataForm.forEach((item) => {
            let curItem = this.generateItem(item);
            children.push(curItem);
        });
        return children;
    }

    //生成搜索项
    generateItem(item) {
        const { getFieldDecorator } = this.props.form;
        switch (item.type) {
            case 'select':
                return (
                    <Col span={6} key={item.name}>
                        <FormItem
                            {...formItemLayout}
                            label={item.cnName}
                        >
                            {getFieldDecorator(item.name)(
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder={`请选择${item.cnName}`}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        item.data.map((dataItem) => {
                                            return (
                                                <Option value={dataItem.id} key={dataItem.id}>{dataItem.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                );
                break;
            case 'input':
                return (
                    <Col span={6} key={item.name}>
                        <FormItem
                            {...formItemLayout}
                            label={item.cnName}
                        >
                            {getFieldDecorator(item.name)(
                                <Input placeholder={`请选择${item.cnName}`} />
                            )}
                        </FormItem>
                    </Col>
                );
                break;
            case 'data':
                return (
                    <Col span={6} key={item.name}>
                        <FormItem
                            {...formItemLayout}
                            label={item.cnName}
                        >
                            {getFieldDecorator(item.name)(
                                <DatePicker
                                showTime={item.isShowTime}
                                format={item.formate}
                                placeholder="选择时间"
                                style={{ width: '100%' }} />
                            )}
                        </FormItem>
                    </Col>
                );
                break;
            default:
                return (
                    <div></div>
                );
        }
    }

    render() {
        console.log(this.state.dataForm);
        return (
            <Form
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>
                    {this.getFields(this.state.dataForm)}   
                    <Col span={6}>
                        <Button shape="circle" icon="search" htmlType="submit" type="info" style={buttonStyle}></Button>
                        <Button shape="circle" onClick={this.handleReset} icon="close" type="normal" style={buttonStyleClose}></Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        reducerSavePublic :state.getIn(['reducerSavePublic'])
    };
};
export default connect(mapStateToProps)(Form.create()(ConSearchForm));

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        style: { textAlign: 'left' }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};
const gutterCol = {
    display: 'flex',
    justifyContent: 'space-between'
};
const lableContainer = {
    height: '32px',
    lineHeight: '32px',
    fontSize: 14,
    flex: 1
};
const rowContent = {
    flex: 4
};
const buttonStyle = {
    borderRadius: 2,
    fontWeight: 700,
    // marginLeft: 20
};
const buttonStyleClose = {
    borderRadius: 2,
    fontWeight: 700,
    marginLeft: 10
};