/**
 * Controller
 * @return
 */
const { helper } = require('thinkkoa');
const feedbackModel = require('../model/feed_back');
const userModel = require('../model/user');
// const logicService = require('../service/common/logic');
const admin_base = require('../common/admin_base.js');
module.exports = class extends admin_base {
    //构造方法
    init(ctx, app) {
        //调用父类构造方法
        super.init(ctx, app);
        this.Model = new feedbackModel(this.app.config('config.model', 'middleware'));
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
    }
    
    //indexAction前置方法
    _before_index() {
        console.log('_before_index');
    }

    //控制器默认方法
    indexAction() {
        return this.ok('success');
    }
    
    // 增加反馈的方法
    async addAction(){
        let curId = this.param('user_id');
        let content = this.param('content');
        let feedBackData = {};
        let userData = await this.userModel.where({id: curId}).find();
        feedBackData.name = userData.real_name;
        feedBackData.nickname = userData.nickname;
        feedBackData.group = userData.group;
        feedBackData.phonenum = userData.phonenum;
        feedBackData.content = content;
        feedBackData.group_name = userData.group_name;
        feedBackData.create_time = helper.datetime();
        await this.Model.add(feedBackData);
        return this.ok('success');
    }
};
// commentList: [
//     {avatar: 'title.png', name: '就在那天', number: 'No.232', supportCount: 222, commentContent: '就卡死覅四分五裂萨菲立刻来了', time: '五分钟前'},
//     {avatar: 'title.png', name: '过往不及', number: 'No.6', supportCount: 341, commentContent: '撒服务二期温热武器为你戊二醛无热无若', time: '半小时前'}
// ]

