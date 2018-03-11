/**
 * Controller
 * @return
 */ 
const {controller, helper} = require('thinkkoa');
const cardModel = require('../model/card');
const userModel = require('../model/user');
const commentModel = require('../model/comment');
const logicService = require('../service/common/logic');

module.exports = class extends controller {
    //构造方法
    init(ctx, app){
        //调用父类构造方法
        super.init(ctx, app);
        this.Model = new cardModel(this.app.config('config.model', 'middleware'));
        // this.Model = new cardModel(this.app.config(this.modelConfig));
        this.Map = {};
        // index列表分页查询SQL数组参数
        this.Mo = { rel: false, sortby: {}, field: [], ispage: true, pagesize: 5 };
        // logic service
        this.logicService = new logicService();
        this.useModel = new userModel(this.app.config('config.model', 'middleware'));
        this.commentModel = new commentModel(this.app.config('config.model', 'middleware'));
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
        // console.log('_before_index');
    }
    //控制器默认方法
    indexAction () {                                                                                                           
        return this.ok('success');
    }
    async saveCardAction () {
        let cardData = this.param();
        console.log(cardData);
        cardData.support = [];
        cardData.create_time = helper.datetime();
        cardData.comment = [];
        cardData.img_url = '/asserts/image/home/content.png';
        //TODO： 要改user表的card里面
        await this.Model.add(cardData);
        return this.ok('success');
    }
    async getListAction() {
        this.Mo.page = this.param('page') || 1;
        let data = await this.logicService.list(this.Model, this.Map, this.Mo);
        return this.ok('success', data);
    }
    async getUserCardAction() {
        let openid = this.param('openid');
        let data = await this.Model.where({openid: openid}).select();
        data.forEach((item)=>{
            item.create_time = helper.datetime(item.create_time, 'yyyy-mm-dd');
        })
        return this.ok('success', data);
    }
    async curentAction() {
        let id = this.param('id');
        let data = await this.Model.where({id: id}).find();
        return this.ok('success', data);
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
    async deleteAction(){
        let id = this.param('id');
        let commentList = await this.Model.where({id: id}).find();
        commentList = commentList.comment;
        echo(commentList);
        await this.Model.where({id: id}).delete();
        await this.commentModel.where({id: commentList}).delete();
        return this.ok('delete success');
    }
};