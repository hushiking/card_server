/**
 * Model
 * @return
 */
const thinkorm = require('thinkorm');

module.exports = class extends thinkorm {
    init(config){
        super.init(config);
        // 模型名称
        this.modelName = 'user';
        // 是否开启迁移(migrate方法可用)
        // this.safe = false;
        // 数据表字段信息
        this.fields = {
            id: {
                type: 'integer',
                primaryKey: true
            },
       
            phonenum: {
                type: 'string',
                default: ''
            },
            openid: {//第三方平台用户识别ID
                type: 'string',
                index: true,
                size: 50,
                defaultsTo: ''
            },
            nickname: {
                type: 'string',
                defautsTo: ''
            },
            real_name: {
                type: 'text',
                defautsTo: ''
            },
            gender: {
                type: 'integer',
                defaultsTo: 2
            },
            personal_achivement: {
                type: 'integer',
                defaultsTo: 0
            },
            team_achivement: {
                type: 'integer',
                defaultsTo: 0
            },
            avatar_url: {
                type: 'text',
                defaultsTo: ''
            },
            create_time: {
                type: 'integer',
                defaultsTo: 0
            },
            role: {
                type: 'integer',
                defaultsTo: 0
            },
            group: {
                type: 'string',
                defaultsTo: '001'
            },
            group_name: {
                type: 'string',
                defaultsTo: ''
            },
            card: {
                type: 'array'
            },
            achivement: {
                type: 'integer',
                defaultsTo: 0
            },
            badge: {
                type: 'array'
            },
            message: {
                type: 'array'
            },
            notice: {
                type: 'integer',
                defaultsTo: 0  
            },
            message_status: {
                type: 'integer',
                defaultsTo: 0  
            },
            // 登录次数的映射
            login_list: {
                type: 'array'
            },
            // 卡片滑动的映射
            slider_card: {
                type: 'integer',
                defaultsTo: 0  
            },
            // 发卡次数
            send_card: {
                type: 'integer',
                defaultsTo: 0
            },
            // 评论点赞次数
            comment_support_num: {
                type: 'integer',
                defaultsTo: 0
            },
            // 卡片点赞次数
            card_support_num: {
                type: 'integer',
                defaultsTo: 0 
            },
            // 发卡权限
            send_card_power: {
                type: 'integer',
                defaultsTo: 1
            },
            // 评论点赞权限
            comment_support_power: {
                type: 'integer',
                defaultsTo: 1
            },
            send_card_times:{
                type: 'integer',
                defaultsTo: 100
            }
        };
        // 数据验证
        this.validations = {};
        // 关联关系
        this.relation = {
            auth_role: {
                type: 'hasone',
                fkey: 'role', //主表外键 (子表主键)
                rkey: 'id' //子表主键
            },
            group: {
                type: 'hasone',
                fkey: 'group', //主表外键 (子表主键)
                rkey: 'id' //子表主键
            },
            card: {
                type: 'hasmany',
                fkey: 'card', //主表外键 (子表主键)
                rkey: 'id' //子表主键
            },
            badge: {
                type: 'hasmany',
                fkey: 'badge', //主表外键 (子表主键)
                rkey: 'id' //子表主键
            },
            message: {
                type: 'hasmany',
                fkey: 'message', //主表外键 (子表主键)
                rkey: 'id' //子表主键
            }
        };
    }
};