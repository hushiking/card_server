import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { USER_TAABLE, USER_TAABLE_DEL } from '../redux/api/config';

export default {
    selectUrl: '',
    tableUrl: USER_TAABLE,
    tableUrlDel: USER_TAABLE_DEL,
    title: '用户管理',
    addForm:{
        curForm: 'USER_ADD',
        modalTitle: '添加用户'
    },
    searchObj: [
        {
            type: 'input',
            cnName: '项目名称',
            name: 'keyword',
            data: []
        }
        // {
        //     type: 'select',
        //     cnName: '级别',
        //     name: 'customerTypes',
        //     viewName: 'attribute',
        //     data: []
        // },
        // {
        //     type: 'select',
        //     cnName: '创建人',
        //     name: 'marketers',
        //     viewName: 'create_userid',
        //     data: []
        // }
    ],
    // , {
    //     title: 'Role',
    //     dataIndex: 'role',
    //     key: 'role',
    //     width: '20%'
    // },
    columns: [
        {
            title: '姓名',
            dataIndex: 'real_name',
            key: 'real_name',
            width: '12%'
        }, {
            title: '手机号',
            dataIndex: 'phonenum',
            key: 'phonenum',
            width: '12%'
        }, {
            title: '个人成就得分',
            dataIndex: 'personal_achivement',
            key: 'personal_achivement',
            width: '12%'
        }, {
            title: '团队成就得分',
            dataIndex: 'team_achivement',
            key: 'team_achivement',
            width: '12%'
        }, {
            title: '群组编号',
            dataIndex: 'group',
            key: 'group',
            width: '20%'
        }, {
            title: '群组名',
            dataIndex: 'group',
            key: 'group',
            width: '20%'
        },{
            title: '操作',
            key: 'action',
            width: '24%',
            items: [
                {
                    id: 0,
                    type: 'login',
                    curForm: 'MESSAGE_SHOW',
                    text: '发消息',
                    modalTitle: '发消息',
                    method: 'modal',
                    redirect: '/home/product_config'
                },
                {
                    id: 1,
                    type: 'edit',
                    curForm: 'USER_EDIT',
                    text: '编辑',
                    modalTitle: '编辑',
                    method: 'modal'
                },
                {
                    id: 3,
                    type: 'delete',
                    curForm: 'USER_DEL',
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