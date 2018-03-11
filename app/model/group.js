/**
 * Model
 * @return
 */
const thinkorm = require('thinkorm');

module.exports = class extends thinkorm {
    init(config){
        super.init(config);
        // 模型名称
        this.modelName = 'group';
        // 是否开启迁移(migrate方法可用)
        // this.safe = false;
        // 数据表字段信息
        this.fields = {
            group_num: {
                type: 'integer',
                defaultsTo: -1
            },
            name: {
                type: 'string',
                required: true,
                size: 100
            },
            group_achivement: {
                type: 'integer',
                defaultsTo: 0
            }
        };
        // 数据验证
        this.validations = {};
        // 关联关系
        this.relation = {};
    }
};