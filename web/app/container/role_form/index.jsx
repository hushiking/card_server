// @role_form container
import './less';
import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, Message, DatePicker } from '../../skit_ui';
// import moment from 'moment';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
// const { TextArea } = Input;
const Option = Select.Option;
// const RadioGroup = Radio.Group;

// 更改拟态框状态
import { modalStatusAction, refrehTableAction } from '../../redux/actions';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet, fetchRestful } from '../../redux/api/common';
import { USER_URL } from '../../redux/api/config';
// import token from '../utils/token';

class ConConsumersForm extends React.Component {
    static defaultProps = {
        reducerSelectList: {
            typeList: []
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            comm_time: '',
            roleSelect: [
                {
                    name: '超级管理员',
                    id: 1
                },
                {
                    name: '管理员',
                    id: 2
                }
                // {
                //     name: '普通用户',
                //     id: 3
                // }
            ],
            commConcatSelect: [],
            saveBtn: '新建'
        };
    }
    componentDidMount() {
        const formState = this.props.curStatus;
        if (formState === 'edit') {
            this.setState({
                saveBtn: '保存'
            })
            const curId = this.props.id;
            fetchSelf('GET', USER_URL+ '/viewRole/id/' + curId).then(res => {
                console.log(res);
                if (res.status === 1) {
                    let curEditObj = {};
                    curEditObj.account = res.data.account;
                    curEditObj.password = res.data.password;
                    curEditObj.auth_role = this.state.roleSelect[res.data.auth_role - 1].name;
                    this.props.form.setFieldsValue(
                        curEditObj
                    );
                }
            });
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const { dispatch } = this.props;
        // const formState = this.props.reducerModal.toJS().data.curForm;
        const formState = this.props.curStatus;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let _url = '';
                let _method = '';
                switch (formState) {
                case 'edit':
                    const curId = this.props.id;
                    console.log(curId);
                    _url = USER_URL + '/editRole/id/' + curId;
                    _method = 'POST';
                    break;
                case 'add':
                    _url = USER_URL + '/addRole';
                    _method = 'POST';
                    break;
                default:
                    break;
                }
                fetchSelf(_method, _url, values, {}).then(res => {
                    if (res.status === 1) {
                        Message.success(res.errmsg);
                        dispatch(modalStatusAction({
                            status: false
                        }));
                        dispatch(refrehTableAction({rodam: Math.random(0, 1)}));
                    } else {
                        Message.error(res.errmsg);
                    }
                });
            }
        });
    }
    render() {
        // const reducerSelectList = this.props.reducerSelectList.data;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
                style: { textAlign: 'left' }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 4
                }
            }
        }; 
        return (
            <Form 
                onSubmit={
                    (e)=>{
                        this.handleSubmit(e);
                    }} 
                style={formStyle} >
                <FormItem
                    {...formItemLayout}
                    label="账户名">
                    {getFieldDecorator('account', {
                        rules: [{
                            required: true, message: '请输入账户名'
                        }]
                    })(
                        <Input placeholder="账户名" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码">
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '密码为必填项'
                        }]
                    })(
                        <Input placeholder="密码" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户权限">
                    {getFieldDecorator('auth_role', {
                        rules: [{
                            required: true, message: 'please input group'
                        }]
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="please select group"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                this.state.roleSelect.map((item) => {
                                    return (<Option value={item.id} key={item.id}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="info" htmlType="submit">{this.state.saveBtn}</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {reducerModal: state.getIn(['reducerModal'])};
};

// 创建联系
export default connect(mapStateToProps)(Form.create()(ConConsumersForm));
ConConsumersForm.propTypes = {
    dispatch: PropTypes.func,
    reducerModal: PropTypes.object,
    reducerSelectList: PropTypes.object,
    form: PropTypes.object,
    id: PropTypes.number,
    curStatus: PropTypes.string
    // status: PropTypes.bool,
    // modalTitle: PropTypes.string
};
const formStyle = {
    width: '620px',
    paddingLeft: '70px'
};
