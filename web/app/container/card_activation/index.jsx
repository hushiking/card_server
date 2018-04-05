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
import { CARD_ACTAVITION } from '../../redux/api/config';
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
            saveBtn: '激活'
        };
    }
    componentDidMount() {
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        // const formState = this.props.reducerModal.toJS().data.curForm;
        const formState = this.props.curStatus;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values, 111111);
                fetchSelf('GET', CARD_ACTAVITION, values, {}).then(res => {
                    if (res.status === 1) {
                        Message.success(res.errmsg);
                        dispatch(refrehTableAction({ rodam: Math.random(0, 1) }));
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
            },
            colon: false
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
                onSubmit={this.handleSubmit.bind(this)}
            >
                <Row gutter={24} style={{ margin: '40px 20px' }}>
                    <Col span={10}>
                        <FormItem
                            {...formItemLayout}
                            label={'日期'}
                        >
                            {getFieldDecorator('start_time')(
                                <DatePicker
                                    showTime={false}
                                    format={'YYYY-MM-DD'}
                                    placeholder="Select Time"
                                    style={{ width: '100%' }} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem
                            {...formItemLayout}
                            label={<span style={{ color: '#D9D9D9' }}>—— &nbsp; </span>}
                        >
                            {getFieldDecorator('end_time')(
                                <DatePicker
                                    showTime={false}
                                    format={'YYYY-MM-DD'}
                                    placeholder="Select Time"
                                    style={{ width: '100%' }} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
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
