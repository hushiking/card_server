import React, { Component, ProTypes } from 'react';
import LoginForm from '../../container/login_form';
import { push } from 'react-router-redux';
import './less/index.less';
import token from '../../utils/token';
import { connect } from 'react-redux';
class Login extends Component {
    // static contextTypes = { router: React.PropTypes.object };
    static proTypes = {
    }
    static defaultProps = {
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        let isToken = token.getToken(), 
        { dispatch } = this.props; 
        if(isToken){
            // this.context.router.push(`/home`);
            dispatch(push('/home'));
        }
    }
    render() {
        return (
            <div className="loginContainer">
                <div className="loginFormContainer">
                    <div className="loginFormBanner">
                        <div className="loginFormLogoContainer">
                        </div>
                        <div className="loginFormContent">
                            <div className="title">登 录</div>
                            <div className="content">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(Login);