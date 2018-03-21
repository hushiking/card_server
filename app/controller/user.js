/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
const cardModel = require('../model/card');
const userModel = require('../model/user');
const logicService = require('../service/common/logic');
const admin_base = require('../common/admin_base.js');
module.exports = class extends admin_base {
    //构造方法
    init(ctx, app) {
        //调用父类构造方法
        super.init(ctx, app);
        // 定义数据对象
        this.Model = new cardModel(this.app.config('config.model', 'middleware'));
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
        this.Map = {};
        // index列表分页查询SQL数组参数
        this.Mo = { rel: false, sortby: {}, field: [], ispage: true, pagesize: 10 };
        // logic service
        this.logicService = new logicService();
    }
    //indexAction前置方法
    _before_index() {
        console.log('_before_index');
    }
    //控制器默认方法
    indexAction() {
        return this.ok('success');
    }
    async userAction() {
        // let openid = this.param('openid');
        let data = await this.userModel.where({openid: this._userInfo.openid}).find();
        return this.ok('success', data);
    }
    async changeNoticeAction(){
        await this.userModel.where({openid: this._userInfo.openid}).update({notice: 0});
        return this.ok('success');
    }
    async getListAction() {
        let data = await this.Model.where({openid: this._userInfo.openid}).select();
        let suport = 0;
        let comment = 0;
        data.map((item)=>{
            suport += item.support.length;
            suport += item.comment.length;
        });
        echo(comment, suport);
        return this.ok('success', {suport, comment});
    }
};