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
    endpoint: 'oss-cn-beijing.aliyuncs.com'
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

    saveCardAction() {
        let cardData = JSON.parse(this.param('data'));
        let file = this.file('file');
        // let _base64file = this.param('_base64file') || '';
        let imageKey = this._userInfo.nickname + helper.datetime();
        // const root = path.resolve(__dirname, './images');
        // let imagesPath = root + '/hah.jpeg';
        let that = this;
        co(function* () {
            // var result = yield store.put(imageKey, file.path);
            var result = yield store.put(imageKey, file.path);
            cardData.img_url = result.url;
            cardData.support = [];
            cardData.comment = [];
            cardData.nickname = that._userInfo.nickname;
            cardData.avatar_url = that._userInfo.avatar_url;
            cardData.group = that._userInfo.group;
            cardData.openid = that._userInfo.openid;
            echo(cardData.img_url );
            yield that.Model.add(cardData);
            return that.ok('success');
        }).catch(function (err) {
            console.log(err);
        });
    }
    async getListAction() {
        this.Mo.page = this.param('page') || 1;
        let data = await this.logicService.list(this.Model, this.Map, this.Mo);
        return this.ok('success', data);
    }
    async getUserCardAction() {
        let data = await this.Model.where({ openid: this._userInfo.openid }).select();
        return this.ok('success', data);
    }
    async curentAction() {
        let id = this.param('id');
        let data = await this.Model.where({ id: id }).find();
        return this.ok('success', data);
    }
    // 点赞
    async supportAction() {
        let id = Number(this.param('id'))
        let data = await this.Model.where({ id: id }).find().catch(e => this.error(e.message));
        let userData = await this.useModel.where({ openid: this._userInfo.openid }).find().catch(e => this.error(e.message))
        // console.log(userData)
        // console.log(data)
        if (data.support.indexOf(userData.id) === -1) {
            data.support.push(userData.id);
            await this.Model.where({ id: id }).update({ support: data.support }).catch(e => this.error(e.message));
            return this.ok('success')
        } else {
            return this.fail('success')
        }

    }
    async deleteAction() {
        let id = this.param('id');
        await this.Model.where({ id: id }).delete();
        return this.ok('delete success');
    }
};


