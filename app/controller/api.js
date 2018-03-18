/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
// const badgeModel = require('../model/badge');
const userModel = require('../model/user');
const messageModel = require('../model/message');
const admin_base = require('../common/admin_base.js');
const logicService = require('../service/common/logic');
module.exports = class extends controller {
    //构造方法
    init(ctx, app) {
        //调用父类构造方法
        super.init(ctx, app);
        // this.Model = new badgeModel(this.app.config('config.model', 'middleware'));
        this.logicService = new logicService();
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
        this.messageModel = new messageModel(this.app.config('config.model', 'middleware'));

        this.Map = {};
        // index列表分页查询SQL数组参数
        this.Mo = { rel: false, sortby: {}, field: [], ispage: true, pagesize: 5 };
    }
    //所有该控制器(含子类)方法前置方法
    //indexAction前置方法
    _before_index() {
        console.log('_before_index');
    }

    //控制器默认方法
    indexAction() {
        return this.ok('success');
    }
    async getUserListAction(){
        let data = await this.logicService.list(this.userModel, this.Map, this.Mo);
        return this.ok('success', data);
    }
    // user 的增删改查方法
    async addUserAction() {
        echo(this.param());
        let userData = this.param();
        userData.nickname = '';
        // userData.role = parseInt(userData.role);
        userData.badge = [];
        userData.message = [];
        userData.card = [];
        await this.userModel.add(userData);
        return this.ok('存储成功');
    }
    async editUserAction() {
        let id = this.param('id');
        let upData = this.post();
        // console.log(upData);
        let data = await this.userModel.where({ id: id }).update(upData).catch(e => this.error(e.message));
        return this.ok('success', data);
    }

    async viewUserAction() {
        let id = this.param('id');
        let pk = await this.userModel.getPk();
        let data = await this.userModel.where({ [pk]: id }).rel(this.Mo.rel || false).find().catch(e => { });
        echo(data);
        return this.ok('success', data);
    }

    async userDelAction() {
        let curId = this.param('id');
        echo(curId);
        await this.userModel.where({id: parseInt(curId)}).delete();
        return this.ok('delete success');
    }
    async messageAddAction (){
        let Data = this.param();
        let messageData = {};
        let userId = this.param('id');
        messageData.create_time = helper.datetime();
        userId = parseInt(userId);
        for (let key in Data){
            if(key !== 'id'){
                messageData[key] = Data[key];
            }
        } 
        let msgId = await this.messageModel.add(messageData);
        let userData = await this.userModel.where({ id: userId}).find().catch(e => { });
        userData.message.push(msgId);
        await this.userModel.where({ id: userId }).update({message: userData.message}).catch(e => this.error(e.message));
        return this.ok('success');
    }
};


