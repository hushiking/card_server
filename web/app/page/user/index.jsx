// @up_clue page
import './less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModSearchSheet from '../../module/search_sheet';
import { UserConfig } from '../../config';
import { Button, Tabs } from '../../skit_ui';
const TabPane = Tabs.TabPane;
class UpCluePage extends Component {
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
            // <Tabs
            //     defaultActiveKey="customer" onChange={(key) => { }}>
            //     <TabPane tab="联通" key="customer">
            //     </TabPane>
            // </Tabs>
            <ModSearchSheet dataConfig={UserConfig} />
            
        );
    }
}
export default UpCluePage;
UpCluePage.propTypes = {
    dispatch: PropTypes.object
};