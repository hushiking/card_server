/**
 * Model
 * @return
 */
const thinkorm = require('thinkorm');

module.exports = class extends thinkorm {
    init(config){
        super.init(config);
        // 模型名称
        this.modelName = 'card';
        // 是否开启迁移(migrate方法可用)
        this.safe = false;
        // 数据表字段信息
        this.fields = {
            id: {
                type: 'integer',
                primaryKey: true
            },
            openid: {//第三方平台用户识别ID
                type: 'string',
                index: true,
                size: 50,
                defaultsTo: ''
            },
            title: {
                type: 'text',
                defaultsTo: ''
            },
            content: {
                type: 'text',
                defaultsTo: ''
            },
            tag: {
                type: 'integer',
                defaultsTo: 0
            },
            create_time: {
                type: 'integer',
                defaultsTo: 0
            },
            support: {
                type: 'array'
            },
            comment: {
                type: 'array'
            },
            img_url: {
                type: 'string',
                defaultsTo: ''
            },
            nickname: {
                type: 'text',
                defaultsTo: ''
            },
            gender: {
                type: 'integer',
                defaultsTo: 2
            },
            avatar_url: {
                type: 'text',
                defaultsTo: ''
            },
            group: {
                type: 'string',
                defaultsTo: '001'
            },
            group_name: {
                type: 'string',
                defaultsTo: ''
            },
            status: {
                type: 'integer',
                defaultsTo: 1
            },
        };
        // 数据验证
        this.validations = {};
        // 关联关系
        this.relation = {
            comment: {
                type: 'hasmany',
                fkey: 'comment', //主表外键 (子表主键)
                rkey: 'id' //子表主键
            }
        };
    }
};