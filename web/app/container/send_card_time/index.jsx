// @send_card_time container
import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, Message, DatePicker } from '../../skit_ui';
// import moment from 'moment';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const { TextArea } = Input;

// 更改拟态框状态
import { modalStatusAction, refreshTableAction } from '../../redux/actions';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet, fetchRestful } from '../../redux/api/common';
import { CARD_TIMMES } from '../../redux/api/config';
// import token from '../utils/token';

class ConSendCardTime extends React.Component {
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
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        // const formState = this.props.reducerModal.toJS().data.curForm;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                let selectedRows = window.LS.get('selectedRows');
                if(selectedRows){
                    selectedRows = JSON.parse(selectedRows);
                    values.select = selectedRows;
                }
                let _method = 'POST';
                fetchSelf(_method, CARD_TIMMES, values, {}).then(res => {
                    if (res.status === 1) {
                        Message.success(res.errmsg);
                        dispatch(modalStatusAction({
                            status: false
                        }));
                        window.LS.set("selectedRows", '');
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
                    label="发卡次数">
                    {getFieldDecorator('times', {
                        rules: [{
                            required: true, message: '请输入发卡次数'
                        }]
                    })(
                        <Input placeholder="请输入发卡次数" />
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
export default connect(mapStateToProps)(Form.create()(ConSendCardTime));
ConSendCardTime.propTypes = {
    dispatch: PropTypes.func,
    reducerModal: PropTypes.object,
    reducerSelectList: PropTypes.object,
    form: PropTypes.object,
    id: PropTypes.number,
    curStatus: PropTypes.string,
    status: PropTypes.string
    // status: PropTypes.bool,
    // modalTitle: PropTypes.string
};
const formStyle = {
    width: '620px',
    paddingLeft: '70px'
};
