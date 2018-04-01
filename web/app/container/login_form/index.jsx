import React from 'react';
import { push } from 'react-router-redux';
import { Form, Input, Button, Message } from '../../skit_ui';
import { connect } from 'react-redux';
import { LOGIN_URL } from '../../redux/api/config';
import { fetchSelf } from '../../redux/api/common';
import token from '../../utils/token';
import PropTypes from 'prop-types';
import './less';
const FormItem = Form.Item;


class RegistrationForm extends React.Component {
    // static contextTypes = { router: React.PropTypes.object };
    constructor() {
        super();
        this.state = {
            formLayout: 'vertical'
        };
    }
    // 数据更改后触发 生命周期
    componentWillReceiveProps() {
    }
    // 进行提交 发送action
    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            // if (values.account === 'admin' && values.password === 'admin'){
            //     dispatch(push('/home'));
            // } else {
            //     Message.error('密码不对请重新输入');
            // }
            const { dispatch } = this.props;
            // dispatch(fetchPost(LOGIN_URL, values));
            fetchSelf('POST', LOGIN_URL, values).then((res) => {
                console.log(res);
                if (res.status == 1) {
                    token.setToken(res.data.access_token);
                    token.setUser(res.data);
                    Message.success(res.errmsg);
                    dispatch(push('/home'));
                } else {
                    Message.error(res.errmsg);
                }
            })
        });
    }
    render() {
        const { formLayout } = this.state;
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        } : null;
        return (
            <div>
                <Form layout="vertical" onSubmit={(e) => { this.handleSubmit(e); }}>
                    <FormItem
                        {...formItemLayout}
                        label="账户">
                        {getFieldDecorator('account', {
                            rules: [{ required: true, message: '请输入账户' }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }]
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button disabled={hasErrors(getFieldsError())} style={submitBtn} type="info" htmlType="submit">登录</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

// 存在错误时登录按钮不可点击
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}



// 创建表单组件
const LoginForm = Form.create()(RegistrationForm);
// 创建联系
export default connect()(LoginForm);

// 进行响应式的表格布局
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0

        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};


// 设置提交按钮的位置 style
const submitBtn = {
    width: 100,
    height: 36,
    position: 'absolute',
    right: '-211px',
    bottom: '-141px'
};
RegistrationForm.propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func
};


