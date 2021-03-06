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
import { USER_URL, BADGE_TABLE } from '../../redux/api/config';
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
            sendCardPower: [
                {
                    name: '拥有',
                    id: 1
                },
                {
                    name: '未拥有',
                    id: 0
                }
            ],
            commentSupportPower: [
                {
                    name: '拥有',
                    id: 1
                },
                {
                    name: '未拥有',
                    id: 0
                }
            ],
            badgeList: [],
            saveBtn: '新建'
        };
    }
    componentDidMount() {
        const formState = this.props.curStatus;
        fetchSelf('GET', BADGE_TABLE, {other: true}).then(res => {
            console.log(res);
            if (res.status === 1) {
                this.setState({
                    badgeList: res.data
                })
            }
        });
        if (formState === 'edit') {
            this.setState({
                saveBtn: '保存'
            })
            const curId = this.props.id;
          
            fetchSelf('GET', USER_URL+ '/viewUser/id/' + curId).then(res => {
                console.log(res);
                if (res.status === 1) {
                    let curEditObj = {};
                    curEditObj.real_name = res.data.real_name;
                    curEditObj.phonenum = res.data.phonenum;
                    curEditObj.send_card_power = res.data.send_card_power;
                    curEditObj.comment_support_power = res.data.comment_support_power;
                    curEditObj.group = res.data.group;
                    curEditObj.send_card_times = res.data.send_card_times;
                    curEditObj.group_name = res.data.group_name;
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
                    _url = USER_URL + '/editUser/id/' + curId;
                    _method = 'POST';
                    break;
                case 'add':
                    _url = USER_URL + '/addUser';
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
                    label="姓名">
                    {getFieldDecorator('real_name', {
                        rules: [{
                            required: true, message: '请输入真实姓名'
                        }]
                    })(
                        <Input placeholder="真实姓名" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号">
                    {getFieldDecorator('phonenum', {
                        rules: [{
                            required: true, message: '手机号为必填项'
                        }]
                    })(
                        <Input placeholder="请输入手机号" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发卡权限">
                    {getFieldDecorator('send_card_power', {
                        rules: [{
                            required: true, message: '请设置用户发卡权限'
                        }]
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="请设置用户发卡权限"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                this.state.sendCardPower.map((item) => {
                                    return (<Option value={item.id} key={item.id}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="评论点赞权限">
                    {getFieldDecorator('comment_support_power', {
                        rules: [{
                            required: true, message: '请设置用户评论点赞权限'
                        }]
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="请设置用户评论点赞权限"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                this.state.commentSupportPower.map((item) => {
                                    return (<Option value={item.id} key={item.id}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="指定徽章">
                    {getFieldDecorator('point_badge', {
                       
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="请设置用户评论点赞权限"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                this.state.badgeList.map((item) => {
                                    return (<Option value={item.id} key={item.id}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户组编号">
                    {getFieldDecorator('group', {
                        // rules: [{
                        //     required: true, message: 'please input phonenum'
                        // }]
                    })(
                        <Input placeholder="请输入组编号" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户组名">
                    {getFieldDecorator('group_name', {
                        // rules: [{
                        //     required: true, message: 'please input phonenum'
                        // }]
                    })(
                        <Input placeholder="请输入组名称" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户发卡剩余数量">
                    {getFieldDecorator('send_card_times', {
                        // rules: [{
                        //     required: true, message: 'please input phonenum'
                        // }]
                    })(
                        <Input placeholder="请输入用户发卡剩余数量" type="number" />
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
