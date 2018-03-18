/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
const userModel = require('../model/user');
const logicService = require('../service/common/logic');
const admin_base = require('../common/admin_base.js');
module.exports = class extends admin_base {
    //构造方法
    init(ctx, app) {
        //调用父类构造方法
        super.init(ctx, app);
        // 定义数据对象
        this.Model = new userModel(this.app.config('config.model', 'middleware'));
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
  
    async getListAction() {
        this.Mo.page = this.param('page') || 1;
        this.Model = helper.isEmpty(this.Model) ? new (require(`${this.ctx.group}/${this.ctx.controller}`))(this.modelConfig) : this.Model;
        let data = await this.logicService.list(this.Model, this.Map, this.Mo);
        return this.ok('success', data);
    }
   
};