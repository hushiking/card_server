import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, Message, DatePicker } from '../../skit_ui';
// import moment from 'moment';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const { TextArea } = Input;
// const RadioGroup = Radio.Group;

// 更改拟态框状态
import { modalStatusAction, refreshTableAction } from '../../redux/actions';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet, fetchRestful } from '../../redux/api/common';
import { ROLE_URL } from '../../redux/api/config';
// import token from '../utils/token';

class ConMessageForm extends React.Component {
    static defaultProps = {
        reducerSelectList: {
            typeList: []
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            comm_time: ''
        };
    }
    componentDidMount() {
        // const formState = this.props.curStatus;
        // if (formState === 'role_edit') {
        //     const curId = this.props.id;
        //     fetchSelf('GET', ROLE_URL+ '/view/id/' + curId).then(res => {
        //         console.log(res);
        //         if (res.status === 1) {
        //             let curEditObj = {};
        //             curEditObj.real_name = res.data.real_name;
        //             curEditObj.phonenum = res.data.phonenum;
        //             curEditObj.role = res.data.role;
        //             curEditObj.group = res.data.group;
        //             curEditObj.achivement = res.data.achivement;

        //             this.props.form.setFieldsValue(
        //                 curEditObj
        //             );
        //         }
        //     });
        // }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        // const formState = this.props.reducerModal.toJS().data.curForm;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let _url;
                let selectedRows = window.LS.get("selectedRows");
                selectedRows = JSON.parse(selectedRows);
                if(selectedRows.length>0){
                    _url = '/api/messageAdd/id/multiSelect';
                    values.selectedRows = selectedRows;
                }else{
                    _url = '/api/messageAdd/id/' + this.props.id;
                }
                let _method = 'POST';
                fetchSelf(_method, _url, values, {}).then(res => {
                    if (res.status === 1) {
                        Message.success(res.errmsg);
                        dispatch(modalStatusAction({
                            status: false
                        }));
                        // dispatch(refreshTableAction());
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
                    label="标题">
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true, message: '请输入标题'
                        }]
                    })(
                        <Input placeholder="title" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="内容">
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '请输入内容' }]
                    })(
                        <TextArea style={{ resize: "none" }} placeholder="请输入沟通记录" rows={6} />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="info" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return { reducerModal: state.getIn(['reducerModal']) };
};

// 创建联系
export default connect(mapStateToProps)(Form.create()(ConMessageForm));
ConMessageForm.propTypes = {
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
