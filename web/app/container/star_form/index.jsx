// @star_form container
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

class ConBadgeForm extends React.Component {
    static defaultProps = {
        reducerSelectList: {
            typeList: []
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            comm_time: '',
            commSelect: [
                {
                    name: '登录',
                    id: '登录'
                },
                {
                    name: '点赞',
                    id: '点赞'
                },
                {
                    name: '刷卡',
                    id: '刷卡'
                },
                {
                    name: '评论',
                    id: '评论'
                }
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
            fetchSelf('GET', USER_URL+ '/viewBadge/id/' + curId).then(res => {
                console.log(res);
                if (res.status === 1) {
                    
                    let curEditObj = {};
                    curEditObj.name = res.data.name;
                    curEditObj.team = res.data.team;
                    curEditObj.icon_url = res.data.icon_url;
                    curEditObj.type = res.data.type;
                    curEditObj.times = res.data.times;
                    curEditObj.personal = res.data.personal;
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
                    _url = USER_URL + '/editBadge/id/' + curId;
                    _method = 'POST';
                    break;
                case 'add':
                    _url = USER_URL + '/addBadge';
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
                    label="徽章名">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入徽章名'
                        }]
                    })(
                        <Input placeholder="请输入徽章名" />
                    )}
                </FormItem>
                
                <FormItem
                    {...formItemLayout}
                    label="徽章类型">
                    {getFieldDecorator('type', {
                        rules: [{
                            required: true, message: '徽章类型'
                        }]
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="徽章类型"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                this.state.commSelect.map((item, index) => {
                                    return (<Option value={item.id} key={item.name + index}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="获得次数">
                    {getFieldDecorator('times', {
                        rules: [{
                            required: true, message: '获得次数'
                        }]
                    })(
                        <Input placeholder="获得次数" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="图片路径">
                    {getFieldDecorator('icon_url', {
                        rules: [{
                            required: true, message: '图片路径'
                        }]  
                    })(
                        <Input placeholder="图片路径" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="个人分数">
                    {getFieldDecorator('personal', {
                        rules: [{
                            required: true, message: '个人分数'
                        }]
                    })(
                        <Input placeholder="个人分数" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="团队分数">
                    {getFieldDecorator('team', {
                        rules: [{
                            required: true, message: '团队分数'
                        }]
                    })(
                        <Input placeholder="团队分数" />
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
export default connect(mapStateToProps)(Form.create()(ConBadgeForm));
ConBadgeForm.propTypes = {
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