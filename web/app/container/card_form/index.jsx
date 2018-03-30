// @comment_form container
import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, Message, DatePicker } from '../../skit_ui';
// import moment from 'moment';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
// const RadioGroup = Radio.Group;

// 更改拟态框状态
import { modalStatusAction, refrehTableAction } from '../../redux/actions';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet, fetchRestful } from '../../redux/api/common';
import { USER_URL } from '../../redux/api/config';
// import token from '../utils/token';

class ConCardForm extends React.Component {
    static defaultProps = {
        reducerSelectList: {
            typeList: []
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            cardStatus: [
                {
                    name: 0,
                    id: 0
                },
                {
                    name: 1,
                    id: 1
                }
            ],
            cardTagSelect: [
                {
                    name: 0,
                    id: 0
                },
                {
                    name: 1,
                    id: 1
                },
                {
                    name: 2,
                    id: 2
                },
                {
                    name: 3,
                    id: 3
                }
            ],
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
            fetchSelf('GET', USER_URL + '/viewCard/id/' + curId).then(res => {
                console.log(res);
                if (res.status === 1) {
                    let curEditObj = {};
                    curEditObj.title = res.data.title;
                    curEditObj.content = res.data.content;
                    curEditObj.tag = res.data.tag;
                    curEditObj.img_url = res.data.img_url;
                    curEditObj.status = res.data.status;
                    this.props.form.setFieldsValue(
                        curEditObj
                    );
                }
            });
        }
    }

    handleSubmit(e) {
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
                    _url = USER_URL + '/editCard/id/' + curId;
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
                        dispatch(refrehTableAction({rodam: Math.random(0, 1)}));
                        dispatch(modalStatusAction({
                            status: false
                        }));
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
                    (e) => {
                        this.handleSubmit(e);
                    }}
                style={formStyle} >
                <FormItem
                    {...formItemLayout}
                    label="卡片标题">
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true, message: '请输入卡片标题'
                        }]
                    })(
                        <Input placeholder="请输入卡片标题" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="卡片内容">
                    {getFieldDecorator('content', {
                        rules: [{
                            required: true, message: '请输入卡片内容'
                        }]
                    })(
                        <TextArea style={{ resize: "none" }} placeholder="请输入卡片内容" rows={6} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="卡片主题">
                    {getFieldDecorator('tag', {
                        rules: [{
                            required: true, message: '卡片主题'
                        }]
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="卡片主题"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                this.state.cardTagSelect.map((item, index) => {
                                    return (<Option value={item.id} key={item.name + index}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="图片路径">
                    {getFieldDecorator('img_url', {
                        rules: [{
                            required: true, message: '图片路径'
                        }]
                    })(
                        <Input placeholder="图片路径" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="卡片状态">
                    {getFieldDecorator('status', {
                        rules: [{
                            required: true, message: '卡片状态'
                        }]
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="卡片状态"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                this.state.cardStatus.map((item, index) => {
                                    return (<Option value={item.id} key={item.name + index}>{item.name}</Option>)
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
    return { reducerModal: state.getIn(['reducerModal']) };
};

// 创建联系
export default connect(mapStateToProps)(Form.create()(ConCardForm));
ConCardForm.propTypes = {
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
