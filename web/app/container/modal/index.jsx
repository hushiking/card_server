import React, { Component, ProTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Row, Col, Tabs, Divider, Modal, Message } from '../../skit_ui';
// Customer
// import ConCustomerEditForm from './customer_edit_form';
import {UserForm, MessageForm} from '../../container'
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
    state = {
        curComponent: <div></div>
    }
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            modalTitle: ''
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
        const { status, modalTitle, curForm, modalParams } = nextProps.data;
        this.setState({
            visible: status,
            modalTitle: modalTitle,
            curComponent: <div />
        });
        let curId;
        switch (curForm) {
            case 'USER_ADD':
            this.setState({
                curComponent: <UserForm curStatus="add" />
            });
            break;
            case 'USER_EDIT':{
                curId = modalParams.id;
                this.setState({
                    curComponent: <UserForm curStatus="edit" id={curId} />
                });
            }
                break;
            case 'MESSAGE_SHOW':
            {
                curId = modalParams.id;
                this.setState({
                    curComponent: <MessageForm  id={curId} />
                });
                break;
            }
                
     
            default:
                break;
        }
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
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
        )
    }
}

const mapStateToProps = state => {
    return state.getIn(['reducerModal']).toJS() || {};
};
// 创建联系
export default connect(mapStateToProps)(ConModal);
