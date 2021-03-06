import React, { Component, ProTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Row, Col, Tabs, Divider, Modal, Message } from '../../skit_ui';
// Customer
// import ConCustomerEditForm from './customer_edit_form';
import { UserForm, MessageForm, CardForm, CommentForm, StarForm, FeedbackForm, CardActivation, RoleForm, SendCardTime } from '../../container';
import { modalStatusAction } from '../../redux/actions';
// // Contact
// import ConContactForm from './contact_form';
// // Communication
// import ConCommunicationForm from './communication_form';
// import ConCommunicationEndorse from './communication_endorse';
// import { ConCustomerEditFormAction } from '../../redux/actions';

class ConModal extends Component {
    static proTypes = {
    }
    static defaultProps = {
        reducerModal: {}
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalTitle: '',
            curComponent: <div />
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        const { status, modalTitle, curForm, modalParams } = nextProps.data;
        this.setState({
            visible: status,
            modalTitle: modalTitle,
            curComponent: <div />
        });
        switch (curForm) {
        case 'USER_ADD':
            this.setState({
                curComponent: <UserForm curStatus="add" />
            });
            break;
        case 'USER_EDIT':
            this.setState({
                curComponent: <UserForm curStatus="edit" id={modalParams.id} />
            });
            break;
        case 'MESSAGE_SHOW':
            this.setState({
                curComponent: <MessageForm id={modalParams.id} />
            });
            break;
        case 'MESSAGE_ADD':
            this.setState({
                curComponent: <MessageForm id={modalParams.id} status={'sendAllUser'} />
            });
            break;
        case 'CARD_EDIT':
            this.setState({
                curComponent: <CardForm curStatus="edit" id={modalParams.id} />
            });
            break;
        case 'COMMENT_EDIT':
            this.setState({
                curComponent: <CommentForm curStatus="edit" id={modalParams.id} />
            });
            break;
        case 'BADGE_ADD':
            this.setState({
                curComponent: <StarForm curStatus="add" />
            });
            break;
        case 'BADGE_EDIT':
            this.setState({
                curComponent: <StarForm curStatus="edit" id={modalParams.id} />
            });
            break;
        case 'FEEDBACK_VIEW':
            this.setState({
                curComponent: <FeedbackForm id={modalParams.id} />
            });
            break;
        case 'CARD_ACTIVATION':
            this.setState({
                curComponent: <CardActivation />
            });
            break;
        case 'ROLE_ADD':
            this.setState({
                curComponent: <RoleForm curStatus="add" />
            });
            break;
        case 'ROLE_EDIT':
            this.setState({
                curComponent: <RoleForm curStatus="edit" id={modalParams.id} />
            });
            break;
        case 'SEND_CARD_TIMMES':
            this.setState({
                curComponent: <SendCardTime />
            });
            break;
        default:
            break;
        }
    }
    handleOk = (e) => {
        this.setState({
            visible: false
        });
    }
    handleCancel = (e) => {
        const { dispatch } = this.props;
        dispatch(modalStatusAction({
            status: false
        }));
    }
    render() {
        return (
            <Modal
                title={this.state.modalTitle}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={740}
                footer={null}>
                {
                    this.state.curComponent
                }
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return state.getIn(['reducerModal']).toJS() || {};
};
// 创建联系
export default connect(mapStateToProps)(ConModal);
