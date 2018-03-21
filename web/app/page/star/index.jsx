// @star page
import './less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModSearchSheet from '../../module/search_sheet';
import { StarConfig } from '../../config';
import { Button, Tabs } from '../../skit_ui';
const TabPane = Tabs.TabPane;
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
            <ModSearchSheet dataConfig={StarConfig} status={true} />
        );
    }
}
export default StarPage;