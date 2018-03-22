import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { MESSAGE_TABLE, MESSAGE_TABLE_DEL } from '../redux/api/config';

export default {
    selectUrl: '',
    tableUrl: MESSAGE_TABLE,
    tableUrlDel: MESSAGE_TABLE_DEL,
    title: '通知管理',
    columns: [
        {
            title: '通知标题',
            dataIndex: ' title',
            key: 'title',
            width: '12%'
        }, {
            title: '通知内容',
            dataIndex: 'content',
            key: 'content',
            width: '12%'
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            width: '12%'
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '12%'
        }, {
            title: '操作',
            key: 'action',
            width: '24%',
            items: [
                {
                    id: 1,
                    type: 'edit',
                    curForm: 'MESSAGE_EDIT',
                    text: '编辑',
                    modalTitle: '编辑',
                    method: 'modal'
                },
                {
                    id: 3,
                    type: 'delete',
                    curForm: 'MESSAGE_DEL',
                    modalTitle: '删除',
                    text: '删除',
                    method: 'delete'
                    
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