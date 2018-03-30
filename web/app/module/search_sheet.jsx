
import React, { Component, ProTypes } from 'react';
import { push } from 'react-router-redux';
// import { Icon, Button, Row, Col, Tabs, Divider, Modal, Message } from '../skit_ui';
import { Flexible, TitleSearch } from '../components';

import { SearchForm, DataTable, ButtonBar } from '../container';

import token from '../utils/token';
import { connect } from 'react-redux';
import { fetchGet } from '../redux/api/common';

class ModSearchSheet extends React.Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            curData: {
            }
        }
    }
    // 处理 SearchSheet Container行为
    handleSearch() {
    }
    // 处理 DataTable Container行为
    handleDataTable(rowIndex, buttonIndex) {
    }

    render(){
        let {rowSelectionRow} = this.props;
        const { dataConfig, status, btnText } = this.props;
        const { columns } = dataConfig;
        return (
            <div>
                <TitleSearch data={dataConfig} status={status} btnText={btnText} />
                <DataTable dataColumn={columns} restfulApi={dataConfig.tableUrl} deleteUrl={dataConfig.tableUrlDel} rowSelectionRow={rowSelectionRow} />
            </div>
        );
    }
}

export default connect()(ModSearchSheet);
