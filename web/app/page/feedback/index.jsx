// @feedback page
import './less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModSearchSheet from '../../module/search_sheet';
import { FeedbackConfig } from '../../config';
import { Button, Tabs } from '../../skit_ui';
class StarPage extends Component {
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
            <ModSearchSheet dataConfig={FeedbackConfig} status={false} />
        );
    }
}
export default StarPage;