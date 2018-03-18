import React, { Component, ProTypes } from 'react';
import {Divider} from '../skit_ui';
import { ActionTable } from '../components';
import Filter from '../utils/filter';
import { SUBJECT_TAABLE } from '../redux/api/config';

export default {
    selectUrl: '',
    tableUrl: SUBJECT_TAABLE,
    searchObj: [
        {
            type: 'data',
            cnName: '日期',
            name: 'create_time',
            isShowTime: false,
            formate: 'YYYY-MM-DD'
        },
        {
            type: 'input',
            cnName: '原始号码',
            name: 'mem_originphone'
        },
        {
            type: 'select',
            cnName: '未留号码',
            name: 'mem_nofullflag',
            data: [{
                id: 1,
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
            width: '10%'
        },
        {
            title: '坐席名称',
            dataIndex: 'call_nickname',
            key: 'call_nickname',
            width: '10%'
        },
        {
            title: '坐席账号',
            dataIndex: 'call_loginname',
            key: 'call_loginname',
            width: '10%'
        },
        {
            title: '用户姓名',
            dataIndex: 'mem_name',
            key: 'mem_name',
            width: '10%'
        },
        {
            title: '性别',
            dataIndex: 'mem_gender',
            key: 'mem_gender',
            width: '10%'
        },
        {
            title: '原始手机号',
            dataIndex: 'mem_originphone',
            key: 'mem_originphone',
            width: '10%'
        },
        {
            title: '外呼评价',
            dataIndex: 'feedback',
            key: 'feedback',
            width: '10%'
        },
        {
            title: '操作',
            key: 'action',
            width: '20%',
            items: [
                {
                    id: 0,
                    type: 'edit',
                    curForm: 'EDIT_SUBJECT_FORM',
                    text: '编辑',
                    modalTitle: '编辑',
                    method: 'modal'
                },
                {
                    id: 1,
                    type: 'eye-o',
                    curForm: 'VIEW_SUBJECT_FORM',
                    text: '查看',
                    modalTitle: '查看',
                    method: 'modal'
                },
                {
                    id: 2,
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
        {
            id: 0,
            icon: 'plus',
            type: 'info',
            style: {},
            title: '新建',
            modalTitle: '新建',            
            curForm: 'ADD_SUBJECT_FORM',
            method: 'modal'
        }
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