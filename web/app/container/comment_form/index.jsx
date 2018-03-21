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

class ConCommentForm extends React.Component {
    static defaultProps = {
        reducerSelectList: {
            typeList: []
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            comm_time: '',
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
            fetchSelf('GET', USER_URL + '/viewComment/id/' + curId).then(res => {
                console.log(res);
                if (res.status === 1) {
                    let curEditObj = {};
                    curEditObj.content = res.data.content;
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
                        _url = USER_URL + '/editComment/id/' + curId;
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
                    label="评论内容">
                    {getFieldDecorator('content', {
                    })(
                        <TextArea style={{ resize: "none" }} placeholder="请输入备注" rows={6} />
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
export default connect(mapStateToProps)(Form.create()(ConCommentForm));
ConCommentForm.propTypes = {
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