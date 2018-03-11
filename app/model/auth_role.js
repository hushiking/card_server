/**
 * Model
 * @return
 */
const thinkorm = require('thinkorm');

module.exports = class extends thinkorm {
    init(config){
        super.init(config);
        // 模型名称
        this.modelName = 'auth_role';
        // 是否开启迁移(migrate方法可用)
        // this.safe = false;
        // 数据表字段信息
        this.fields = {
            id: {
                type: 'integer',
                primaryKey: true
            },
            desc: {
                type: 'string',
                unique: true,
                required: true,
                size: 100,
                defaultsTo: ''
            },
            status: {
                type: 'integer',
                required: true,
                index: true,
                defaultsTo: 0
            },
            rule_ids: {
                type: 'array',
                // defaultsTo: []
            },
            ext: {
                type: 'json',
                // defaultsTo: {}
            }
        };
        // 数据验证
        this.validations = {};
        // 关联关系
        this.relation = {};
    }
};