/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
// const badgeModel = require('../model/badge');
const userModel = require('../model/user');
const messageModel = require('../model/message');
const commentModel = require('../model/comment');
const badgeModel = require('../model/badge');
const logicService = require('../service/common/logic');
const feedbackModel = require('../model/feed_back');
module.exports = class extends controller {
    //构造方法
    init(ctx, app) {
        //调用父类构造方法
        super.init(ctx, app);
        // this.Model = new badgeModel(this.app.config('config.model', 'middleware'));
        this.logicService = new logicService();
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
        this.messageModel = new messageModel(this.app.config('config.model', 'middleware'));
        this.commentModel = new commentModel(this.app.config('config.model', 'middleware'));
        this.badgeModel = new badgeModel(this.app.config('config.model', 'middleware'));
        this.feedbackModel = new feedbackModel(this.app.config('config.model', 'middleware'));

        this.Map = {};
        // index列表分页查询SQL数组参数
        this.Mo = { rel: false, sortby: {}, field: [], ispage: true, pagesize: 5 };
    }
    //所有该控制器(含子类)方法前置方法
    //indexAction前置方法
    __before() {
        console.log('_before_index');
        this.Mo.page = this.param('page') || 1;
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
        return this.ok('success', data);
    }

    async userDelAction() {
        let curId = this.param('id');
        await this.userModel.where({id: parseInt(curId)}).delete();
        return this.ok('delete success');
    }
    async messageAddAction (){
        let messageData = {};
        let userId = this.param('id');
        messageData.create_time = helper.datetime();
        messageData.title = this.param('title');
        messageData.content = this.param('content');
        let msgId = await this.messageModel.add(messageData);
        userId = parseInt(userId);
        // 发送单一 和发送多条
        if(userId){
            let userData = await this.userModel.where({ id: userId}).find().catch(e => { });
            userData.message.push(msgId);
            await this.userModel.where({ id: userId }).update({message: userData.message}).catch(e => this.error(e.message));
        }else{
            let selectedRows = this.param('selectedRows');
            let userList = await this.userModel.where({ id: selectedRows}).select().catch(e => { });
            let promiseList = [];
            userList.forEach((item)=>{
                item.message.push(msgId);

                promiseList.push( this.userModel.where({ id: item.id }).update({message: item.message}).catch(e => this.error(e.message)));
            });
            Promise.all(promiseList).then(function(values) {
                console.log(values);
            });
            // selectedRows = userData.message.concat(selectedRows);
        }
        return this.ok('success');
        
      
    }
    // comment 的增删改查方法
    async getCommentListAction(){
        let result = await this.logicService.list(this.commentModel, this.Map, this.Mo);
        if(result && result.data && result.data.length>0){
            result.data.forEach(item => {
                item.support = item.support.length;
                item.create_time = helper.datetime(item.create_time, 'yyyy-mm-dd');
            });
        }
        return this.ok('success', result);
    }
    async commentDelAction() {
        let curId = this.param('id');
        await this.commentModel.where({id: parseInt(curId)}).delete();
        return this.ok('delete success');
    }
    async viewCommentAction() {
        let id = this.param('id');
        let pk = await this.commentModel.getPk();
        let data = await this.commentModel.where({ [pk]: id }).rel(this.Mo.rel || false).find().catch(e => { });
        return this.ok('success', data);
    }
    async editCommentAction() {
        let id = this.param('id');
        let upData = this.post();
        // console.log(upData);
        let data = await this.commentModel.where({ id: id }).update(upData).catch(e => this.error(e.message));
        return this.ok('success', data);
    }
    // badge 的增删改查方法
    async addBadgeAction() {
        echo(this.param());
        let addBadge = this.param();
        addBadge.team = parseInt(addBadge.team);
        addBadge.personal = parseInt(addBadge.personal);
        await this.badgeModel.add(addBadge);
        return this.ok('存储成功');
    }
    async getBadgeListAction(){
        let result = await this.logicService.list(this.badgeModel, this.Map, this.Mo);
        return this.ok('success', result);
    }
    async viewBadgeAction() {
        let id = this.param('id');
        let pk = await this.badgeModel.getPk();
        let data = await this.badgeModel.where({ [pk]: id }).rel(this.Mo.rel || false).find().catch(e => { });
        return this.ok('success', data);
    }
    async editBadgeAction() {
        let id = this.param('id');
        let addBadge = this.post();
        addBadge.team = parseInt(addBadge.team);
        addBadge.personal = parseInt(addBadge.personal);
        // console.log(upData);
        let data = await this.badgeModel.where({ id: id }).update(addBadge).catch(e => this.error(e.message));
        return this.ok('success', data);
    }
    // badge 的增删改查方法
    async getFeedBackListAction(){
        let result = await this.logicService.list(this.feedbackModel, this.Map, this.Mo);
        result.data.map((item)=>{
            item.create_time = helper.datetime(item.create_time, 'yyyy-mm-dd');
        });
        return this.ok('success', result);
    }
    async feedBackViewAction() {
        let id = this.param('id');
        let data = await this.feedbackModel.where({ id: id }).rel(this.Mo.rel || false).find().catch(e => { });
        return this.ok('success', data);
    }
    async FeedBackDelAction() {
        let id = this.param('id');
        await this.feedbackModel.where({id: id}).delete();
        return this.ok('delete success');
    }
    // async editBadgeAction() {
    //     let id = this.param('id');
    //     let addBadge = this.post();
    //     addBadge.team = parseInt(addBadge.team);
    //     addBadge.personal = parseInt(addBadge.personal);
    //     // console.log(upData);
    //     let data = await this.badgeModel.where({ id: id }).update(addBadge).catch(e => this.error(e.message));
    //     return this.ok('success', data);
    // }
};


