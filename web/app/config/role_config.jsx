import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { ROLE_TAABLE, ROLE_TAABLE_DEL } from '../redux/api/config';

export default {
    selectUrl: '',
    tableUrl: ROLE_TAABLE,
    tableUrlDel: ROLE_TAABLE_DEL,
    title: '账户管理',
    addForm: {
        curForm: 'ROLE_ADD',
        modalTitle: '添加账户'
    },
    columns: [
        {
            title: '账户权限',
            dataIndex: 'desc',
            key: 'desc',
            width: '20%'
        },
        {
            title: '账号名',
            dataIndex: 'account',
            key: 'account',
            width: '20%'
        }, {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            width: '20%'
        }, {
            title: '操作',
            key: 'action',
            width: '40%',
            items: [
                {
                    id: 1,
                    type: 'edit',
                    curForm: 'ROLE_EDIT',
                    text: '编辑',
                    modalTitle: '编辑',
                    method: 'modal'
                },
                {
                    id: 3,
                    type: 'delete',
                    curForm: 'ROLE_DEL',
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
};
