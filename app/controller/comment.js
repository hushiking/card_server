/**
 * Controller
 * @return
 */
const {controller, helper} = require('thinkkoa');
const commentModel = require('../model/comment');
const userModel = require('../model/user');
const logicService = require('../service/common/logic');
module.exports = class extends controller {
    //构造方法
    init(ctx, app){
        //调用父类构造方法
        super.init(ctx, app);
        this.Model = new commentModel(this.app.config('config.model', 'middleware'));
        this.useModel = new userModel(this.app.config('config.model', 'middleware'));
    }
    //所有该控制器(含子类)方法前置方法
    __before(){
        console.log('__before');
    }
    //URI定位到该控制器,如果该控制器不存在某个方法时自动调用
    __empty(){
        return this.json('can\'t find action');
    }
    //indexAction前置方法
    _before_index(){
        console.log('_before_index');
    }
    
    //控制器默认方法
    indexAction () {
        return this.ok('success');
    }
    // 删除评论的方法
    async deleteAction(){
        let id = this.param('id');
        await this.Model.where({id: id}).delete();
        return this.ok('delete success');
    }
    // 点赞
    async supportAction() {
        let openid = this.param('openid')
        let id = Number(this.param('id'))
        let data = await this.Model.where({ id: id }).find().catch(e => this.error(e.message));
        let userData = await this.useModel.where({ openid: openid }).find().catch(e => this.error(e.message))
        // console.log(userData)
        // console.log(data)
        if(data.support.indexOf(userData.id) === -1){
            data.support.push(userData.id);
            await this.Model.where({ id: id }).update({support: data.support}).catch(e => this.error(e.message));
            return this.ok('success',{status: 1})
        }else {
            return this.ok('success',{status: 0})
        }
        
    }
    // 获取评论列表
    async getListAction() {
        let card_id = this.param('card_id');
        
        let data = await this.Model.where({card_id: card_id}).select();
        data.forEach(value => {
            value.create_time = helper.datetime(value.create_time, 'yyyy-mm-dd')
        })
        return this.ok('success', data);
    }
    // 保存评论
    async saveCommentAction() {
        let commentData = this.param();
        let curUser = await this.useModel.where({ openid: commentData.openid }).find().catch(e => this.error(e.message))
        commentData.create_time = helper.datetime()
        commentData.card_id = Number(commentData.card_id)
        commentData.support = []
        // console.log(helper.datetime())
        if (JSON.stringify(curUser) != "{}" ) {
            commentData.nickname = curUser.nickname
            commentData.gender = curUser.gender
            commentData.avatar_url = curUser.avatar_url
            commentData.group = curUser.group
        }
        await this.Model.add(commentData);
        // console.log(commentData)
        return this.ok('success', {'a': 1})
        
        
    }
    
};
// commentList: [
//     {avatar: 'title.png', name: '就在那天', number: 'No.232', supportCount: 222, commentContent: '就卡死覅四分五裂萨菲立刻来了', time: '五分钟前'},
//     {avatar: 'title.png', name: '过往不及', number: 'No.6', supportCount: 341, commentContent: '撒服务二期温热武器为你戊二醛无热无若', time: '半小时前'}
// ]

