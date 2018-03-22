import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { FEEDBACK_TABLE, FEEDBACK_TAABLE_DEL } from '../redux/api/config';

export default {
    selectUrl: '',
    tableUrl: FEEDBACK_TABLE,
    tableUrlDel: FEEDBACK_TAABLE_DEL,
    title: '评论管理',
    columns: [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: '12%'
        }, {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            width: '12%'
        }, {
            title: '群组',
            dataIndex: 'group_name',
            key: 'content',
            width: '12%'
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            width: '12%'
        },
        {
            title: '联系方式',
            dataIndex: 'phonenum',
            key: 'phonenum',
            width: '12%'
        }, {
            title: '操作',
            key: 'action',
            width: '24%',
            items: [
                {
                    id: 1,
                    type: 'eye-o',
                    curForm: 'FEEDBACK_VIEW',
                    text: '查看',
                    modalTitle: '查看',
                    method: 'modal'
                },
                {
                    id: 3,
                    type: 'delete',
                    curForm: 'FEEDBACK_DEL',
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