// @comment page
import './less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModSearchSheet from '../../module/search_sheet';
import { MessageConfig } from '../../config';
import { Button, Tabs } from '../../skit_ui';
const TabPane = Tabs.TabPane;
class MessagePage extends Component {
    static defaultProps = {
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        return (
            <ModSearchSheet dataConfig={MessageConfig} status={true} />
        );
    }
}
export default MessagePage;