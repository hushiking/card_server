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
        this.usrModel = new userModel(this.app.config('config.model', 'middleware'));
    }
    //indexAction前置方法
    _before_index(){
        console.log('_before_index');
    }
    //控制器默认方法
    indexAction () {
        return this.ok('success');
    }
    async addAction (){
        let Data = this.param();
        let messageData = {};
        let userId = this.param('id');
        for (let key in Data){
            if(key !== 'id'){
                messageData[key] = Data[key];
            }
        } 
        let msgId = await this.Model.add(messageData);
        let userData = await this.usrModel.where({ id: userId }).find().catch(e => { });
        userData.message.push(msgId);
        await this.usrModel.where({ id: userId }).update({message: userData.message}).catch(e => this.error(e.message));
        return this.ok('success');
    }
    async messageListAction (){
        let openid = this.param('openid');
        let messageList = await this.Model.where({ openid: openid }).select().catch(e => { });
        messageList.forEach((item)=>{
            item.create_time = helper.datetime(item.create_time, 'yyyy-mm-dd');
        })
        return this.ok('success', messageList);
    }

};