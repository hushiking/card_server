/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
const userModel = require('../model/user');
const logicService = require('../service/common/logic');

module.exports = class extends controller {
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
    async addAction() {
        echo(this.param());
        let userData = this.param();
        userData.nickname = '';
        userData.role = parseInt(userData.role);
        userData.group = parseInt(userData.group);
        userData.badge = [];
        userData.message = [];
        userData.card = [];
        await this.Model.add(userData);
        return this.ok('存储成功');
    }
    async getListAction() {
        this.Mo.page = this.param('page') || 1;
        this.Model = helper.isEmpty(this.Model) ? new (require(`${this.ctx.group}/${this.ctx.controller}`))(this.modelConfig) : this.Model;
        let data = await this.logicService.list(this.Model, this.Map, this.Mo);
        return this.ok('success', data);
    }
    async delAction() {
        let curDel = this.param();
        await this.Model.where(curDel).delete();
        return this.ok('delete success');
    }
    async viewAction() {
        let id = this.param('id');
        let pk = await this.Model.getPk();
        let data = await this.Model.where({ [pk]: id }).rel(this.Mo.rel || false).find().catch(e => { });
        echo(data);
        return this.ok('success', data);
    }
    async editAction() {
        let id = this.param('id');
        let upData = this.post();
        upData.role = parseInt(upData.role);
        upData.group = parseInt(upData.group);
        // console.log(upData);
        let data = await this.Model.where({ id: id }).update(upData).catch(e => this.error(e.message));
        echo(data);
        return this.ok('success', data);
    }
};