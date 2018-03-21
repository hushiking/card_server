// @comment page
import './less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModSearchSheet from '../../module/search_sheet';
import { CommentConfig } from '../../config';
import { Button, Tabs } from '../../skit_ui';
const TabPane = Tabs.TabPane;
class CommentPage extends Component {
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
            <ModSearchSheet dataConfig={CommentConfig} status={false} />
        );
    }
}
export default CommentPage;