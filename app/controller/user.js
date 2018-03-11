/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
const cardModel = require('../model/card');
const userModel = require('../model/user');
const logicService = require('../service/common/logic');

module.exports = class extends controller {
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
    //所有该控制器(含子类)方法前置方法
    __before() {
        console.log('__before');
    }
    //URI定位到该控制器,如果该控制器不存在某个方法时自动调用
    __empty() {
        return this.json('can\'t find action');
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
        let openid = this.param('openid');
        let data = await this.userModel.where({openid: openid}).find();
        return this.ok('success', data);
    }
    async getListAction() {
        let openid = this.param('openid');
        let data = await this.Model.where({openid: openid}).select();
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