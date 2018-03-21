/**
 * Controller
 * @return
 */
const {controller, helper} = require('thinkkoa');
const messageModel = require('../model/message');
const userModel = require('../model/user');
const admin_base = require('../common/admin_base.js');
module.exports = class extends admin_base {
    //构造方法
    init(ctx, app){
        //调用父类构造方法
        super.init(ctx, app);
        this.Model = new messageModel(this.app.config('config.model', 'middleware'));
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
    }
    //indexAction前置方法
    _before_index(){
        console.log('_before_index');
    }
    //控制器默认方法
    indexAction () {
        return this.ok('success');
    }
   
    async messageListAction (){
        let curUser = await this.userModel.where({ openid: this._userInfo.openid }).find().catch(e => { });
        let messageList;
        if(curUser && curUser.message.length > 0){
            messageList = await this.Model.where({ id: curUser.message }).select().catch(e => { });
            echo(messageList);
        }
        messageList.forEach(item => {
            item.create_time = helper.datetime(item.create_time, 'yyyy-mm-dd');
        })
        return this.ok('success', messageList);
    }

};