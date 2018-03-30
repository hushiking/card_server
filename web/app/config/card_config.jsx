import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { CARD_TABLE, CARD_TABLE_DEL } from '../redux/api/config';

export default {
    selectUrl: '',
    tableUrl: CARD_TABLE,
    tableUrlDel: CARD_TABLE_DEL,
    title: '卡片管理',
    columns: [
        {
            title: '卡片主题',
            dataIndex: 'title',
            key: 'title',
            width: '12%'
        }, {
            title: '卡片内容',
            dataIndex: 'content',
            key: 'content',
            width: '12%'
        }, {
            title: '卡片类型',
            dataIndex: 'tag',
            key: 'tag',
            width: '12%'
        }, {
            title: '点赞次数',
            dataIndex: 'support',
            key: 'support',
            width: '12%'
        }, {
            title: '评论次数',
            dataIndex: 'comment',
            key: 'comment',
            width: '12%'
        }, {
            title: '群组编号',
            dataIndex: 'group',
            key: 'group',
            width: '12%'
        }, {
            title: '群组名',
            dataIndex: 'group_name',
            key: 'group_name',
            width: '12%'
        }, {
            title: '卡片状态',
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
                    curForm: 'CARD_EDIT',
                    text: '编辑',
                    modalTitle: '编辑',
                    method: 'modal'
                },
                {
                    id: 3,
                    type: 'delete',
                    curForm: 'CARD_DEL',
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
