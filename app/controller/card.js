/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
const cardModel = require('../model/card');
const userModel = require('../model/user');
const logicService = require('../service/common/logic');
const admin_base = require('../common/admin_base.js');
// 阿里云存储图片
const fs = require('fs');
const co = require('co');
const path = require('path');
const oss = require('ali-oss');

//构建oss对象
const store = oss({
    accessKeyId: 'LTAISOc0ScI5UBmk',
    accessKeySecret: 'xL0n36PhdE9i4xsRuHg8kkjzKVhcRT',
    bucket: 'lzkj-card',
    region: 'oss-cn-shanghai',
});
module.exports = class extends admin_base {
    //构造方法
    init(ctx, app) {
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
    }
    //indexAction前置方法
    _before_index() {
        // console.log('_before_index');
    }
    //控制器默认方法
    indexAction() {
        return this.ok('success');
    }

    async saveCardAction() {
        echo('success');
        let cardData = this.param();
        let file = this.file();

        // co(async function(stream) {
        //     let result = await store.putStream('images', fs.createReadStream(file));
        //     // let result = await store.put('object-key', new Buffer('hello world'));
        // }).catch( (err) => {
        //     echo(err);
        // })
        let userData = await this.useModel.where({ openid: this._userInfo.openid }).find();
        cardData.support = [];
        cardData.comment = [];
        cardData.nickname = userData.nickname;
        cardData.avatar_url = userData.avatar_url;
        cardData.group = userData.group;
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
        let data = await this.Model.where({ openid: openid }).select();
        echo(data);
        return this.ok('success', data);
    }
    async curentAction() {
        let id = this.param('id');
        let data = await this.Model.where({ id: id }).find();
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
        if (data.support.indexOf(userData.id) === -1) {
            data.support.push(userData.id);
            await this.Model.where({ id: id }).update({ support: data.support }).catch(e => this.error(e.message));
            return this.ok('success', { status: 1 })
        } else {
            return this.ok('success', { status: 0 })
        }

    }
    async deleteAction() {
        let id = this.param('id');
        await this.Model.where({ id: id }).delete();
        return this.ok('delete success');
    }
};


