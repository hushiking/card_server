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
const path = require('path');
const oss = require('ali-oss');
const co = require('co');


//构建oss对象
const store = new oss({
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
    aliyunImg(filePath) {
        let that = this;
        return co(function* () {
            let imageKey = that._userInfo.nickname + helper.datetime();
            let result = yield store.put(imageKey, filePath);
            return result.url;
        }).catch(function (err) {
            console.log(err);
        });
    }
    async saveCardAction() {
        let cardData = JSON.parse(this.param('data'));
        let filePath;
        if (this.file()) {
            filePath = this.file('file').path;

        }
        let img_url;
        if (filePath) {
            img_url = await this.aliyunImg(filePath);
        } else {
            img_url = 'http://lzkj-card.oss-cn-beijing.aliyuncs.com/%E5%88%98%E6%B3%BD%E5%AE%811523377149';
        }
        cardData.img_url = img_url;
        cardData.support = [];
        cardData.comment = [];
        cardData.nickname = this._userInfo.nickname;
        cardData.avatar_url = this._userInfo.avatar_url;
        cardData.group = this._userInfo.group;
        cardData.openid = this._userInfo.openid;
        cardData.create_time = helper.datetime();
        await this.Model.add(cardData);
        let curUser = await this.useModel.where({ openid: this._userInfo.openid }).find();
        if (curUser.send_card_times) {
            curUser.send_card_times = --curUser.send_card_times;
            if (!curUser.send_card_times) {
                curUser.send_card_power = 0;
            }
        }
        await this.useModel.where({ openid: this._userInfo.openid }).update(curUser);
        return this.ok('success');
    }
    async getListAction() {
        this.Mo.page = this.param('page') || 1;
        this.Map.status = 1;
        let data = [];
        let cardStatus = this.param('cardStatus');
        echo(cardStatus);
        switch (cardStatus) {
            case '0-0':
                data = await this.logicService.list(this.Model, this.Map, this.Mo);
                break;
            case '0-1':
                this.Map.tag = 0;
                data = await this.logicService.list(this.Model, this.Map, this.Mo);
                break;
            case '0-2':
                this.Map.tag = 1;
                data = await this.logicService.list(this.Model, this.Map, this.Mo);
                break;
            case '0-3':
                this.Map.tag = 2;
                data = await this.logicService.list(this.Model, this.Map, this.Mo);
                break;
            case '0-4':
                this.Map.tag = 3;
                data = await this.logicService.list(this.Model, this.Map, this.Mo);
                break;
            case '1-0':
                let hotData = [];
                let tagone = await this.Model.where({tag: 0, status: 1}).select();
                tagone.sort((a, b) => {
                    return b.support.length - a.support.length
                })
                if (tagone) {
                    if (tagone.length > 10) {
                        data = data.concat(tagone.slice(0, 10));
                    } else {
                        data = data.concat(tagone);
                    }
                }
                let tagtwo = await this.Model.where({tag: 1, status: 1}).select();
                tagtwo.sort((a, b) => {
                    return b.support.length - a.support.length
                })
                if (tagtwo) {
                    if (tagtwo.length > 10) {
                        data = data.concat(tagtwo.slice(0, 10));
                    } else {
                        data = data.concat(tagtwo);
                    }
                }
                let tagthree = await this.Model.where({tag: 2, status: 1}).select();
                tagthree.sort((a, b) => {
                    return b.support.length - a.support.length
                })
                if (tagthree) {
                    if (tagthree.length > 10) {
                        data = data.concat(tagthree.slice(0, 10));
                    } else {
                        data = data.concat(tagthree);
                    }
                }
                let tagfour = await this.Model.where({tag: 3, status: 1}).select();
                tagfour.sort((a, b) => {
                    return b.support.length - a.support.length
                })
                if (tagfour) {
                    if (tagfour.length > 10) {
                        data = data.concat(tagfour.slice(0, 10));
                    } else {
                        data = data.concat(tagfour);
                    }
                }

                data.slice((this.page - 1) * 5, this.page * 5);
                break;
            case '1-1':
                {
                    let tagtwo = await this.Model.where({tag: 0, status: 1}).select();
                    tagtwo.sort((a, b) => {
                        return b.support.length - a.support.length
                    })
                    if (tagtwo) {
                        if (tagtwo.length > 10) {
                            data = data.concat(tagtwo.slice(0, 10));
                        } else {
                            data = data.concat(tagtwo);
                        }
                    }
                }
                break;
            case '1-2':
                {
                    let tagtwo = await this.Model.where({tag: 1, status: 1}).select();
                    tagtwo.sort((a, b) => {
                        return b.support.length - a.support.length
                    })
                    if (tagtwo) {
                        if (tagtwo.length > 10) {
                            data = data.concat(tagtwo.slice(0, 10));
                        } else {
                            data = data.concat(tagtwo);
                        }
                    }
                }
            case '1-3':
                {
                    let tagtwo = await this.Model.where({tag: 2, status: 1}).select();
                    tagtwo.sort((a, b) => {
                        return b.support.length - a.support.length
                    })
                    if (tagtwo) {
                        if (tagtwo.length > 10) {
                            data = data.concat(tagtwo.slice(0, 10));
                        } else {
                            data = data.concat(tagtwo);
                        }
                    }
                }
                break;
            case '1-4':
                {
                    let tagtwo = await this.Model.where({tag: 3, status: 1}).select();
                    tagtwo.sort((a, b) => {
                        return b.support.length - a.support.length
                    })
                    if (tagtwo) {
                        if (tagtwo.length > 10) {
                            data = data.concat(tagtwo.slice(0, 10));
                        } else {
                            data = data.concat(tagtwo);
                        }
                    }
                }
                break;
            default:
                break;
        }
        // await this.logicService.list(this.Model, this.Map, this.Mo);
        return this.ok('success', data);
    }
    async getUserCardAction() {
        let data = await this.Model.where({ openid: this._userInfo.openid }).select();
        data.forEach(value => {
            value.create_time = helper.datetime(value.create_time, 'yyyy-mm-dd');
        });
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


