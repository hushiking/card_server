
/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
const adminPassport = require('../service/admin/passport');
const userModel = require('../model/user');
const messageModel = require('../model/message');
const cardModel = require('../model/card');
const roleModel = require('../model/auth_user');
const commentModel = require('../model/comment');
const badgeModel = require('../model/badge');
const logicService = require('../service/common/logic');
const feedbackModel = require('../model/feed_back');
const mime = require('mime-types');
// 阿里云存储图片
const fs = require('fs');
const path = require('path');
const oss = require('ali-oss');
const co = require('co');
const projectGroup = require('../service/admin/insert');
const userSendCard = require('../service/common/user_send_card');
//构建oss对象
const store = new oss({
    accessKeyId: 'LTAISOc0ScI5UBmk',
    accessKeySecret: 'xL0n36PhdE9i4xsRuHg8kkjzKVhcRT',
    bucket: 'lzkj-card',
    region: 'oss-cn-shanghai',
    endpoint: 'oss-cn-beijing.aliyuncs.com'
});
module.exports = class extends controller {
    //构造方法
    init(ctx, app) {
        //调用父类构造方法
        super.init(ctx, app);
        this.userSendCardT = new userSendCard(app);
        // this.Model = new badgeModel(this.app.config('config.model', 'middleware'));
        this.logicService = new logicService();
        this.roleModel = new roleModel(this.app.config('config.model', 'middleware'));
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
        this.messageModel = new messageModel(this.app.config('config.model', 'middleware'));
        this.cardModel = new cardModel(this.app.config('config.model', 'middleware'));
        this.commentModel = new commentModel(this.app.config('config.model', 'middleware'));
        this.badgeModel = new badgeModel(this.app.config('config.model', 'middleware'));
        this.feedbackModel = new feedbackModel(this.app.config('config.model', 'middleware'));

        this.Map = {};
        // index列表分页查询SQL数组参数
        this.Mo = { rel: false, sortby: {}, field: [], ispage: true, pagesize: 5 };


        this.projectGroupService = new projectGroup(app);
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

    /**
     * 登录
     * @return {*}
     */
    async loginAction() {
        if (this.isPost()) {
            let info = this.param() || {};
            let user = await new adminPassport(this.app).loginAdmin(info.account, info.password, this.ctx.ip).catch(e => {
                return this.fail(e.message);
            });
            // echo(user);
            if (helper.isEmpty(user)) {
                return this.fail('用户名或密码错误');
            } else {
                //设置token，配置失效时间3600
                let token = this.ctx.jwtEncode({ userid: user.username });
                return this.ok('登录成功', { access_token: token, nickname: user.username, role: user.role, icon: '' });
            }
        } else {
            return this.fail('仅支持post方式');
        }
    }
    // 账户增删改查的方法
    async roleListAction() {
        let data = await this.logicService.list(this.roleModel, this.Map, this.Mo);
        return this.ok('success', data);
    }
    async roleDelAction() {
        let curId = this.param('id');
        await this.roleModel.where({ id: parseInt(curId) }).delete();
        return this.ok('delete success');
    }
    async addRoleAction() {
        let upData = this.param();
        let roleList = [
            {
                name: '超级管理员',
                id: 1
            },
            {
                name: '管理员',
                id: 2
            },
            {
                name: '普通用户',
                id: 3
            }
        ];
        let curRole;
        // upData.auth_role = Number(upData.auth_role);
        if (helper.isNumber(upData.auth_role)) {
            curRole = roleList[upData.auth_role - 1];
            upData.auth_role = curRole.id;
            upData.desc = curRole.name;
        }
        await this.roleModel.add(upData);
        return this.ok('存储成功');
    }
    async editRoleAction() {
        let id = this.param('id');
        let upData = this.post();
        // console.log(upData);
        let roleList = [
            {
                name: '超级管理员',
                id: 1
            },
            {
                name: '管理员',
                id: 2
            },
            {
                name: '普通用户',
                id: 3
            }
        ];
        let curRole;
        // upData.auth_role = Number(upData.auth_role);
        if (helper.isNumber(upData.auth_role)) {
            curRole = roleList[upData.auth_role - 1];
            upData.auth_role = curRole.id;
            upData.desc = curRole.name;
        } else {
            roleList.map((item) => {
                if (item.name === upData.auth_role) {
                    curRole = item;
                    upData.auth_role = curRole.id;
                    upData.desc = curRole.name;
                }
            });
        }
        let data = await this.roleModel.where({ id: id }).update(upData).catch(e => this.error(e.message));
        return this.ok('success', data);
    }

    async viewRoleAction() {
        let id = this.param('id');
        let pk = await this.roleModel.getPk();
        let data = await this.roleModel.where({ [pk]: id }).rel(this.Mo.rel || false).find().catch(e => { });
        return this.ok('success', data);
    }
    // user 的增删改查方法
    async getUserListAction() {
        let real_name = this.param('real_name');
        if(real_name){
            this.Map =  { or : [
                { real_name: { 'like': `%${real_name}%` } },
                { phonenum: { 'like': `%${real_name}%` } },
                { nickname: { 'like': `%${real_name}%` } },
                { group_name: { 'like': `%${real_name}%` } },
            ]};
        }
        let data = await this.logicService.list(this.userModel, this.Map, this.Mo);
        return this.ok('success', data);
    }
    async addUserAction() {
        let userData = this.param();
        if(userData.send_card_times){
            userData.send_card_times = Number(userData.send_card_times);
            if(userData.send_card_times>0){
                userData.send_card_power = 1;
            }
        }
        if(userData.point_badge){
            userData.badge = [userData.point_badge];
        }else{
            userData.badge = [];
        }
        delete userData.point_badge;
        userData.nickname = '';
        userData.message = [];
        userData.card = [];
        userData.login_list = [];
        await this.userModel.add(userData);
        return this.ok('存储成功');
    }
    async editUserAction() {
        let id = this.param('id');
        let addBadgeId;
        let upData = this.post();
        if(upData.send_card_times){
            upData.send_card_times = Number(upData.send_card_times);
            if(upData.send_card_times>0){
                upData.send_card_power = 1;
            }
        }
        if(upData.point_badge){
            addBadgeId = upData.point_badge;
            let curUser = await this.userModel.where({ id: id }).find();
            if(curUser.badge.indexOf(addBadgeId) === -1){
                curUser.badge.push(addBadgeId);
            }
            await this.userModel.where({ id: id }).update({'badge': curUser.badge});
        }
        delete upData.point_badge;
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
        await this.userModel.where({ id: parseInt(curId) }).delete();
        return this.ok('delete success');
    }

    // message 的增删改查
    async getMessageListAction() {
        let data = await this.logicService.list(this.messageModel, this.Map, this.Mo);
        return this.ok('success', data);
    }
    async messageAddAction() {
        let messageData = {};
        let userId = this.param('id');
        messageData.create_time = helper.datetime();
        messageData.title = this.param('title');
        messageData.content = this.param('content');
        let msgId = await this.messageModel.add(messageData);
        if (userId === 'sendAllUser') {
            let userList = await this.userModel.where().select().catch(e => { });
            let promiseList = [];
            userList.forEach((item) => {
                item.message.push(msgId);
                promiseList.push(this.userModel.where({ id: item.id }).update({ message: item.message, message_status: 1 }).catch(e => this.error(e.message)));
            });
        } else if (userId === 'multiSelect') {
            let selectedRows = this.param('selectedRows');
            let userList = await this.userModel.where({ id: selectedRows }).select().catch(e => { });
            let promiseList = [];
            userList.forEach((item) => {
                item.message.push(msgId);
                promiseList.push(this.userModel.where({ id: item.id }).update({ message: item.message, message_status: 1 }).catch(e => this.error(e.message)));
            });
            Promise.all(promiseList).then(function (values) {
                // console.log(values);
            });
            // selectedRows = userData.message.concat(selectedRows);
            // 发送单一 和发送多条
        } else {
            let userData = await this.userModel.where({ id: userId }).find().catch(e => { });
            userData.message.push(msgId);
            await this.userModel.where({ id: userId }).update({ message: userData.message, message_status: 1 }).catch(e => this.error(e.message));
        }
        return this.ok('success');
    }
    async editMessageAction() {
        let id = this.param('id');
        let upData = this.post();
        // console.log(upData);
        let data = await this.messageModel.where({ id: id }).update(upData).catch(e => this.error(e.message));
        return this.ok('success', data);
    }
    async viewMessageAction() {
        let id = this.param('id');
        let pk = await this.messageModel.getPk();
        let data = await this.messageModel.where({ [pk]: id }).rel(this.Mo.rel || false).find().catch(e => { });
        return this.ok('success', data);
    }
    async messageDelAction() {
        let curId = this.param('id');
        await this.messageModel.where({ id: parseInt(curId) }).delete();
        let userList = await this.userModel.where().select();
        return this.ok('delete success');
    }
    // 激活指定日期的卡片
    async activateCardListAction() {
        let start_time = Math.floor(this.param('start_time') / 1000);
        let end_time = Math.floor(this.param('end_time') / 1000);
        let promiseList = [];
        let cardList = await this.cardModel.where({ create_time: { '>=': start_time, '<=': end_time } }).select();
        cardList.map((item) => {
            promiseList.push(this.cardModel.where({ id: item.id }).update({ status: 0 }).catch(e => this.error(e.message)));
        });
        await Promise.all(promiseList).then(() => {
        });
        return this.ok('反激活成功');
    }
    // 卡片增删改查
    async getCardListAction() {
        this.Mo.sortby = { create_time: 'desc' };
        let result = await this.logicService.list(this.cardModel, this.Map, this.Mo);
        if (result && result.data && result.data.length > 0) {
            result.data.forEach(item => {
                item.support = item.support.length;
                item.comment = item.comment.length;
                item.create_time = helper.datetime(item.create_time, 'yyyy-mm-dd');
            });
        }
        return this.ok('success', result);
    }
    async cardDelAction() {
        let curId = this.param('id');
        await this.cardModel.where({ id: parseInt(curId) }).delete();
        return this.ok('delete success');
    }
    async viewCardAction() {
        let id = this.param('id');
        let pk = await this.cardModel.getPk();
        let data = await this.cardModel.where({ [pk]: id }).rel(this.Mo.rel || false).find().catch(e => { });
        return this.ok('success', data);
    }
    async editCardAction() {
        let id = this.param('id');
        let upData = this.post();
        // console.log(upData);
        let data = await this.cardModel.where({ id: id }).update(upData).catch(e => this.error(e.message));
        return this.ok('success', data);
    }

    // comment 的增删改查方法
    async getCommentListAction() {
        let result = await this.logicService.list(this.commentModel, this.Map, this.Mo);
        if (result && result.data && result.data.length > 0) {
            result.data.forEach(item => {
                item.support = item.support.length;
                item.create_time = helper.datetime(item.create_time, 'yyyy-mm-dd');
            });
        }
        return this.ok('success', result);
    }
    async commentDelAction() {
        let curId = this.param('id');
        await this.commentModel.where({ id: parseInt(curId) }).delete();
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
    aliyunImg(filePath) {
        let that = this;
        return co(function* () {
            let imageKey = 'badge' + helper.datetime();
            // echo(new Buffer('../1.png'));
            let result = yield store.put('object-key', new Buffer(filePath));
            return result.url;
        }).catch(function (err) {
            console.log(err);
        });
    }
    async addBadgeAction() {
        let addBadge = this.param();
        addBadge.team = parseInt(addBadge.team);
        addBadge.personal = parseInt(addBadge.personal);
        await this.badgeModel.add(addBadge);
        return this.ok('存储成功');
    }
    async getBadgeListAction() {
        if(this.param('other')){
            let result = await this.badgeModel.where({type: '其他'}).select();
            return this.ok('success', result);
        }
        let result = await this.logicService.list(this.badgeModel, this.Map, this.Mo);
        return this.ok('success', result);
    }
    async badgeDelAction() {
        let curId = this.param('id');
        await this.badgeModel.where({ id: parseInt(curId) }).delete();
        return this.ok('delete success');
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
        // addBadge.badge = await this.aliyunImg(addBadge.badge);
        let data = await this.badgeModel.where({ id: id }).update(addBadge).catch(e => this.error(e.message));
        return this.ok('success', data);
    }


    // feedback 的增删改查方法

    async getFeedBackListAction() {
        let result = await this.logicService.list(this.feedbackModel, this.Map, this.Mo);
        result.data.map((item) => {
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
        await this.feedbackModel.where({ id: id }).delete();
        return this.ok('delete success');
    }
    async sendCardTimesAction() {
        let times = this.param('times');
        let select = this.param('select');
        times = Number(times);
        if(!select || select.length <= 0){
            this.userSendCardT.reSetUserCardTimes(times);
        }else{
            this.userSendCardT.reSetUserCardTimes(times, 'multiSelect', select);
        }
        return this.ok('设置成功');
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


    // 用户导入Excel文件
    async uploadUserAction () {
        //echo('upload');
        let file = this.file();
        let fileData = {};
        for (let n in file) {
            fileData = file[n];
            break;
        }
        if (helper.isEmpty(fileData)) {
            return this.fail('上传文件不存在');
        }

        /*
        let mimetype;
        try {
            const buffer = readChunk.sync(fileData.path, 0, 4100);
            const ftype = fileType(buffer);
            //if file-type not support
            echo(ftype);
            if (ftype) {
                mimetype = ftype.ext;
            } else {
                mimetype = mime.extension(mime.lookup(fileData.path));
            }
        } catch (e) { }
        */
        let mimetype = mime.extension(mime.lookup(fileData.path));
        if (!mimetype || (mimetype !== 'xls' && mimetype !== 'xlsx')) {
            return this.fail('请上传xls格式文件');
        }
        
        await this.projectGroupService.importCallGroupUsers(fileData.path).catch(e => {
            return this.fail(e.message);
        });
        return this.ok('导入成功');
    }
    
};


