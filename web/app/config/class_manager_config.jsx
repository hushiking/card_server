import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { MONITOR_SELECT, MONITOR_TABLE } from '../redux/api/config';

export default {
    selectUrl: MONITOR_SELECT,
    tableUrl: MONITOR_TABLE,
    searchObj: [
        {
            type: 'data',
            cnName: '日期',
            name: 'create_time',
            isShowTime: false,
            formate: 'YYYY-MM-DD'
        },
        {
            type: 'select',
            cnName: '项目',
            name: 'projectid',
            viewName: 'projectNameList',
            data: []
        },
        {
            type: 'select',
            cnName: '坐席',
            name: 'call_userid',
            viewName: 'callUserList',
            data: []
        },
        {
            type: 'select',
            cnName: '录音',
            name: 'clue_status',
            data: [
            {
                id: 'all',
                name: '全部'
            }
            ,{
                id: -1,
                name: '是'
            },
            {
                id: 0,
                name: '否'
            }]
        }
    ],
    columns: [
        {
            title: '日期',
            dataIndex: 'create_time',
            key: 'create_time',
            width: '9%'
        },
        {
            title: '项目名称',
            dataIndex: 'projectname',
            key: 'projectname',
            width: '9%'
        },
        {
            title: '坐席',
            dataIndex: 'call_username',
            key: 'call_username',
            width: '9%'
        },
        {
            title: '用户姓名',
            dataIndex: 'mem_name',
            key: 'mem_name',
            width: '9%'
        },
        {
            title: '手机号',
            dataIndex: 'mem_fullphone',
            key: 'mem_fullphone',
            width: '9%'
        },
        {
            title: '车型级别',
            dataIndex: 'mem_modellevel',
            key: 'mem_modellevel',
            width: '9%'
        },
        {
            title: '购车预算',
            dataIndex: 'mem_budget',
            key: 'mem_budget',
            width: '9%'
        },
        {
            title: '意向品牌车型1',
            dataIndex: 'mem_favormodel1',
            key: 'create_time2',
            width: '9%'
        },
        {
            title: '意向品牌车型2',
            dataIndex: 'mem_favormodel2',
            key: 'create_tim1',
            width: '9%'
        },
        {
            title: '备注',
            dataIndex: 'note',
            key: 'note',
            width: '9%'
        },
        {
            title: '操作',
            key: 'action',
            width: '9%',
            items: [
                {
                    id: 0,
                    type: 'cloud-upload-o',
                    curForm: 'UPDATA_RADIO',
                    text: '上传录音',
                    modalTitle: '上传录音',
                    method: 'modal'
                }
            ]
        }
    ],
    buttonBar: [
        // {
        //     id: 0,
        //     icon: 'plus',
        //     type: 'info',
        //     style: {},
        //     title: '新建',
        //     modalTitle: '新建',            
        //     curTab: 'customerAdd'
        // },
        // {
        //     id: 1,
        //     icon: 'download',
        //     type: 'success',
        //     style: { marginLeft: 8 },
        //     title: '导出',
        //     modalTitle: '导出',       
        //     curTab: 'customerExport'
        // }
    ],
    filters(data){
        // 定义一个要返回的对象
        let resultData = {};
        // 获取提炼search的数据 
        Filter.dataFilter(data, this.searchObj);
        return this.searchObj || [];
    }
}