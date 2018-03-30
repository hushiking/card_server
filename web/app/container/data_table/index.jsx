import React, { Component, ProTypes } from 'react';
import { Icon, Button, Row, Col, Tabs, Divider, Modal, Message, Table, Popconfirm, Switch } from '../../skit_ui';
import { push } from 'react-router-redux';
// import token from '../utils/token';
import { connect } from 'react-redux';
import { fetchGet, fetchSelf, fetchRestful } from '../../redux/api/common';
import { Column } from 'rc-table/lib';
import { ActionTable } from '../../components';
import { modalStatusAction, reducerRefreshTable } from '../../redux/actions';
import { hashHistory } from 'react-router';
import { MONITOR_TABLE, SUBJECT_TAABLE } from '../../redux/api/config';
import moment from 'moment';
// 表单前面的选择
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        let userIdList = [];
        if(selectedRows.length>0){
            selectedRows.map((item)=>{
                userIdList.push(item.id);
            })
        }
        window.LS.set("selectedRows", JSON.stringify(userIdList));
    }
};
class ConDataTable extends Component {
    static proTypes = {

    }
    static defaultProps = {
        needFilter: false
    }
    state = {
        subStringLength: 17,
        tableData: [],
        tableStatus: true,
        pageSize: 0,
        pageTotal: 0,
        curPage: 0,
    }
    constructor(props) {
        super(props);
        this.handleTableRowAction = this.handleTableRowAction.bind(this);
    }

    componentDidMount() {
        this.refreshPage();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.reducerRefreshTable !== nextProps.reducerRefreshTable) {
            let params = nextProps.reducerRefreshTable.toJS().data;
            // 触发带参数的搜索
            this.refreshPage(params);
        }
    }
    refreshPage(params = undefined) {
        const { restfulApi, dispatch, router } = this.props;
        let query = {};
        // 判断是否存在路由对象
        if (router) {
            query = router.toJS().locationBeforeTransitions.query;
        }
        // 判断是否输入搜索参数
        if (params) {
            query = Object.assign(query, params);
        }
        this.setState({
            loading: true
        });
        // 请求数据 重新渲染表格
        fetchSelf('GET', restfulApi, query, dispatch).then(res => {
            if (res.status == 1) {
                console.log(res);
                if (restfulApi === MONITOR_TABLE) {
                    this.setState({
                        tableData: res.data && res.data.pagerData ? res.data.pagerData.data : [],
                        tableStatus: false,
                        pageSize: res.data.pagerData.num,
                        pageTotal: res.data.pagerData.count,
                        curPage: Number(res.data.pagerData.page)
                    });
                    return;
                }
                this.setState({
                    tableData: res.data && res.data.data ? res.data.data : [],
                    tableStatus: false,
                    pageSize: res.data.num,
                    pageTotal: res.data.count,
                    curPage: Number(res.data.page),
                });
            } else {
                Message.error(res.errmsg || '请求失败');
            }
        });
    }

    // 更改 分页的样式
    itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a style={{ marginRight: '18px' }}><Icon type="left" /> 上一页</a>;
        } else if (type === 'next') {
            return <a style={{ marginLeft: '10px' }}>下一页 <Icon type="right" /></a>;
        }
        return originalElement;
    }
    // 更改分页请求数据
    handleTableChange = (pagination, filters, sorter) => {
        // const { dispatch, dataUrl } = this.props;
        // const accessToken = token.getToken();
        // dispatch(fetchGet(dataUrl, { page: pagination.current }, {
        //     'x-access-token': accessToken
        // }));
    }
    // 点击删除的回调
    confirm(record, itemIndex, aActionItem) {
        const { query } = hashHistory.getCurrentLocation();
        let { deleteUrl } = this.props;
        let { tableData } = this.state, curId = record.id, curIndex;
        tableData.forEach((item, index) => {
            if (item.id === curId) {
                return curIndex = index
            }
        })
        let delUrl = `${deleteUrl}/id/${curId}`;
        fetchRestful('GET', delUrl, {}, this.props.dispatch).then(res => {
            this.refreshPage({page: this.state.curPage});
            // 获取当前元素字段 进行渲染 表格
            Message.success('删除成功');
        });
    }
    //处理表格行action
    handleTableRowAction(record, itemIndex, aActionItem) {
        const { dispatch } = this.props;
        switch (aActionItem.method) {
        case 'redirect':
            if (aActionItem.redirect === '/home/subject') {
                console.log(record.name);
                window.LS.set('curProject', record.name);
            }
            dispatch(push({
                pathname: aActionItem.redirect,
                query: {
                    projectid: record.id
                }
            }));
            break;
        case 'modal':
            let modalParams = {};
            if (record.id) {
                modalParams.id = record.id;
            }
            dispatch(modalStatusAction({
                modalParams: modalParams,
                btnIndex: itemIndex,
                curForm: aActionItem.curForm,
                modalTitle: aActionItem.modalTitle,
                status: true,
                rodam: Math.random(0, 1)
            }));
            break;
        default:
            break;
        }
    }
    //生成表格item action
    generateTableRowActions() {
        let columns = this.props.dataColumn || [], isDivider, isDelete;
        const { restfulApi } = this.props;

        for (let aColumn of columns) {
            if (aColumn.key === 'action') {
                //item render method
                aColumn['render'] = (text, record, index) => (
                    <span >
                        {
                            aColumn.items.map((aActionItem, itemIndex) => {
                                // 项目页表格方法的特殊处理
                                if (record.clue_status === 2 && aActionItem.curForm === 'EDIT_SUBJECT_FORM') {
                                    return;
                                }
                                // 判断是否存在分割线
                                if (aColumn.items.length - 1 === itemIndex) {
                                    isDivider = <span></span>
                                } else {
                                    isDivider = <Divider type="vertical" />
                                }
                                // 判断是否是删除按钮
                                if (aActionItem.method === 'delete') {
                                    isDelete = <Popconfirm key={aActionItem.id} placement="topLeft" title='are you sure delete' onConfirm={() => {
                                        this.confirm(record, itemIndex, aActionItem)
                                    }} okText="Yes" cancelText="No">
                                        <ActionTable key={aActionItem.id} type={aActionItem.type} text={aActionItem.text} />
                                    </Popconfirm>
                                } else {
                                    isDelete = <ActionTable key={aActionItem.id} onClick={() => { this.handleTableRowAction(record, itemIndex, aActionItem) }} type={aActionItem.type} text={aActionItem.text} />
                                }

                                return (
                                    <span>
                                        {isDelete}
                                        {isDivider}
                                    </span>
                                );
                            })
                        }
                    </span>
                );
            }
        }
        return columns;
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { dispatch, dataUrl } = this.props;
        this.refreshPage({ page: pagination.current })
    }

    render() {
        // 如果传进来为 true 则表格有前方选中项
        let rowSelectionRow;
        console.log(this.props.rowSelectionRow , 111111)
        this.props.rowSelectionRow ? rowSelectionRow = rowSelection : null;
        const columns = this.generateTableRowActions();
        let { pageSize, pageTotal, curPage } = this.state;
        return (
            // <Table 
            //     onChange={this.handleTableChange} 
            //     pagination={{
            //         itemRender: this.itemRender,
            //         current : curPage,
            //         pageSize : pageSize,
            //         total : pageTotal
            //     }} 
            //     columns={columns}  
            //     dataSource={tableData}
            //     />
            <div>
                <Table
                    rowSelection={rowSelectionRow}
                    columns={columns}
                    dataSource={this.state.tableData}
                    loading={this.state.tableStatus}
                    onChange={this.handleTableChange}
                    pagination={{
                        itemRender: this.itemRender,
                        current: curPage,
                        pageSize: pageSize,
                        total: pageTotal
                    }} />
            </div>

        )
    }
}

// how to get refer reducer ? to do...
const mapStateToProps = state => {
    return {
        router: state.getIn(['router']),
        reducerRefreshTable: state.getIn(['reducerRefreshTable'])
    };
};
export default connect(mapStateToProps)(ConDataTable);
