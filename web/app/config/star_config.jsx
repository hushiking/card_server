import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { BADGE_TABLE, COMMENT_TABLE_DEL } from '../redux/api/config';

export default {
    selectUrl: '',
    tableUrl: BADGE_TABLE,
    addForm: {
        curForm: 'BADGE_ADD',
        modalTitle: '添加用户'
    },
    title: '评论管理',
    columns: [
        {
            title: '徽章ID',
            dataIndex: 'id',
            key: 'id',
            width: '12%'
        }, {
            title: '徽章名',
            dataIndex: 'name',
            key: 'name',
            width: '12%'
        }, {
            title: '个人分数',
            dataIndex: 'personal',
            key: 'content',
            width: '12%'
        }, {
            title: '团队分数',
            dataIndex: 'team',
            key: 'team',
            width: '12%'
        },
        {
            title: '获得次数',
            dataIndex: 'times',
            key: 'times',
            width: '12%'
        },
        {
            title: '徽章类型',
            dataIndex: 'type',
            key: 'type',
            width: '12%'
        }, {
            title: '操作',
            key: 'action',
            width: '24%',
            items: [
                {
                    id: 1,
                    type: 'edit',
                    curForm: 'BADGE_EDIT',
                    text: '编辑',
                    modalTitle: '编辑',
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