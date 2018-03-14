/**
 * Model
 * @return
 */
const thinkorm = require('thinkorm');

module.exports = class extends thinkorm {
    init(config){
        super.init(config);
        // 模型名称
        this.modelName = 'comment';
        // 是否开启迁移(migrate方法可用)
        this.safe = false;
        // 数据表字段信息
        this.fields = {
            id: {
                type: 'integer',
                primaryKey: true
            },
            card_id: {
                type: 'integer'
            },
            title: {
                type: 'text',
                defaultsTo: ''
            },
            content: {
                type: 'text',
                defaultsTo: ''
            },
            support: {
                type: 'array'
            },  
            create_time: {
                type: 'integer',
                defaultsTo: 0
            },
            status: {
                type: 'integer',
                defaultsTo: 1
            },
            openid: {//第三方平台用户识别ID
                type: 'string',
                index: true,
                size: 50,
                defaultsTo: ''
            },
            group: {
                type: 'integer',
                defaultsTo: 0
            },
            nickname: {
                type: 'string',
                defautsTo: ''
            },
            gender: {
                type: 'integer',
                defaultsTo: 2
            },
            avatar_url: {
                type: 'text',
                defaultsTo: ''
            },
        };
        // 数据验证
        this.validations = {};
        // 关联关系
        this.relation = {};
    }
};