/**
 * Controller
 * @return
 */
const {controller, helper} = require('thinkkoa');
const messageModel = require('../model/message');
const userModel = require('../model/user');
module.exports = class extends controller {
    //构造方法
    init(ctx, app){
        //调用父类构造方法
        super.init(ctx, app);
        this.Model = new messageModel(this.app.config('config.model', 'middleware'));
        this.usrModel = new userModel(this.app.config('config.model', 'middleware'));
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
};