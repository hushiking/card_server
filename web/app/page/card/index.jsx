// @card page
import './less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModSearchSheet from '../../module/search_sheet';
import { CardConfig } from '../../config';
import { Button, Tabs } from '../../skit_ui';
const TabPane = Tabs.TabPane;
class CardPage extends Component {
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
            <ModSearchSheet dataConfig={CardConfig} status={false} />
        );
    }
}
export default CardPage;
