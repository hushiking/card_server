/**
 * Model
 * @return
 */
const thinkorm = require('thinkorm');

module.exports = class extends thinkorm {
    init(config){
        super.init(config);
        // 模型名称
        this.modelName = 'badge';
        // 是否开启迁移(migrate方法可用)
        this.safe = false;
        // 数据表字段信息
        this.fields = {
            id: {
                type: 'integer',
                primaryKey: true
            },
            name: {
                type: 'string',
                required: true,
                size: 100
            },
            icon_url: {
                type: 'string'
            },
            personal: {
                type: 'integer',
                defaultsTo: 0
            },
            team: {
                type: 'integer',
                defaultsTo: 0

            },
            type: {
                type: 'string',
                defaultsTo: ''

            },
            times: {
                type: 'string',
                defaultsTo: ''

            }
        };
        // 数据验证
        this.validations = {};
        // 关联关系
        this.relation = {};
    }
};