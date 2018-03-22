// @feedback_form container
import './less';
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
import { USER_URL } from '../../redux/api/config';
// import token from '../utils/token';

class ConFeedBackForm extends React.Component {
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
        let curId = this.props.id;
        fetchSelf('GET', USER_URL+ '/feedBackView/id/' + curId).then(res => {
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

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        // const formState = this.props.reducerModal.toJS().data.curForm;
        this.props.form.validateFieldsAndScroll((err, values) => {
           
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
                    label="内容">
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '请输入内容' }]
                    })(
                        <TextArea style={{ resize: "none" }} disabled={true} placeholder="请输入沟通记录" rows={6} />
                    )}
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return { reducerModal: state.getIn(['reducerModal']) };
};

// 创建联系
export default connect(mapStateToProps)(Form.create()(ConFeedBackForm));
ConFeedBackForm.propTypes = {
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