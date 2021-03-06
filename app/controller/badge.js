/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
const badgeModel = require('../model/badge');
const userModel = require('../model/user');
const commentModel = require('../model/comment');
const cardModel = require('../model/card');
const admin_base = require('../common/admin_base.js');
module.exports = class extends admin_base {
    //构造方法
    init(ctx, app) {
        //调用父类构造方法
        super.init(ctx, app);
        this.Model = new badgeModel(this.app.config('config.model', 'middleware'));
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
        this.cardModel = new cardModel(this.app.config('config.model', 'middleware'));
        this.commentModel = new commentModel(this.app.config('config.model', 'middleware'));
    }
    //所有该控制器(含子类)方法前置方法
    //indexAction前置方法
    _before_index() {
        console.log('_before_index');
    }

    //控制器默认方法
    indexAction() {
        return this.ok('success');
    }
    async hasGetBdageAction(){
        let curUser = await this.userModel.where({ openid: this._userInfo.openid }).find();
        let hasgetBadgeList = await this.Model.where({id: curUser.badge}).select().catch(e => this.error(e.message));
        let curDateTime = helper.datetime();
        hasgetBadgeList.map((item)=>{
            if(item.end_time && item.end_time - curDateTime < 0){
                item.icon_url = item.old_url;
            }
            item.end_time = helper.datetime(item.end_time, 'yyyy-mm-dd');
        });
        return this.ok('success', hasgetBadgeList);
    }
    // 获取数据
    async getDateAction() {
        // 更新用户徽章
        let commentList = await this.commentModel.where({ openid: this._userInfo.openid }).select();
        let curUser = await this.userModel.where({ openid: this._userInfo.openid }).find().catch(e => this.error(e.message));
        let otherBadgeList = await this.Model.field(['id']).where({ type: '其他' }).select().catch(e => this.error(e.message));
        let otherBadgeIdList = [];
        otherBadgeList.map((badgeId)=>{
            otherBadgeIdList.push(badgeId.id);
        });
        let badgeList = [];
        curUser.badge.map((item)=>{
            if(item && otherBadgeIdList.indexOf(item) !== -1){
                badgeList.push(item);
            }
        });
        let commentTimes = commentList.length;
        // 登录类徽章获取
        let loginTimmes = curUser.login_list.length;
        let loginBadgeList = await this.Model.where({ type: '登录', times: { '<=': loginTimmes } }).select().catch(e => this.error(e.message));
        loginBadgeList.map((item)=>{
            badgeList.push(item.id);
        });
        // 评论点赞
        let commentSupportTimes = curUser.comment_support_num;
        let commentSupportList = await this.Model.where({ type: '评论点赞', times: { '<=': commentSupportTimes } }).select().catch(e => this.error(e.message));
        commentSupportList.map((item)=>{
            badgeList.push(item.id);
        });
        // 卡片点赞
        let cardSupportTimes = curUser.card_support_num;
        let cardSupportList = await this.Model.where({ type: '卡片点赞', times: { '<=': cardSupportTimes } }).select().catch(e => this.error(e.message));
        cardSupportList.map((item)=>{
            badgeList.push(item.id);
        });
        // 发卡次数
        let sendCardTimes = curUser.send_card;
        let sendCardList = await this.Model.where({ type: '发卡次数', times: { '<=': sendCardTimes } }).select().catch(e => this.error(e.message));
        sendCardList.map((item)=>{
            badgeList.push(item.id);
        });
        // 发卡求助徽章 0
        let helpCardTimesList = await this.cardModel.where({openid: this._userInfo.openid, tag: 0}).select();
        let helpCardList = await this.Model.where({ type: '求助', times: { '<=': helpCardTimesList.length } }).select().catch(e => this.error(e.message));
        helpCardList.map((item)=>{
            badgeList.push(item.id);
        });
        // 发卡求助徽章 1
        let showCardTimesList = await this.cardModel.where({openid: this._userInfo.openid, tag: 1}).select();
        let showCardList = await this.Model.where({ type: '展示', times: { '<=': showCardTimesList.length } }).select().catch(e => this.error(e.message));
        showCardList.map((item)=>{
            badgeList.push(item.id);
        });
        // 发卡求助徽章 2
        let sourceCardTimesList = await this.cardModel.where({openid: this._userInfo.openid, tag: 2}).select();
        let sourceCardList = await this.Model.where({ type: '资源', times: { '<=': sourceCardTimesList.length } }).select().catch(e => this.error(e.message));
        sourceCardList.map((item)=>{
            badgeList.push(item.id);
        });
        // 发卡求助徽章 3
        let skillCardTimesList = await this.cardModel.where({openid: this._userInfo.openid, tag: 3}).select();
        let skillCardList = await this.Model.where({ type: '技能', times: { '<=': skillCardTimesList.length } }).select().catch(e => this.error(e.message));
        skillCardList.map((item)=>{
            badgeList.push(item.id);
        });
        // 刷卡类徽章获取
        let sliderCardTimes = curUser.slider_card;
        let lsliderCardList = await this.Model.where({ type: '刷卡', times: { '<=': sliderCardTimes } }).select().catch(e => this.error(e.message));
        lsliderCardList.map((item)=>{
            badgeList.push(item.id);
        });
        // 符合评论的列表
        let commentsBadgeList = await this.Model.where({ type: '评论', times: { '<=': commentTimes } }).select().catch(e => this.error(e.message));
        commentsBadgeList.map((item)=>{
            badgeList.push(item.id);
        });
        let badgeAllList = await this.Model.select().catch(e => this.error(e.message));
        let waitGet = [];
        let hasGet = [];
        badgeAllList.map((item)=>{
            if(badgeList.indexOf(item.id) === -1){
                waitGet.push(item);
            }else{
                hasGet.push(item);
            }
        });
        let personTotal = 0;
        let teamTotal = 0;
        // 获取当前时间
        let curDateTime = helper.datetime();
        waitGet.map((item)=>{
            if(item.end_time && item.end_time - curDateTime < 0){
                item.icon_url = item.old_url;
            }
            item.end_time = helper.datetime(item.end_time, 'yyyy-mm-dd');
        });
        hasGet.map((item)=>{
            personTotal += item.personal;
            teamTotal += item.team;
            if(item.end_time && item.end_time - curDateTime < 0){
                item.icon_url = item.old_url;
            }
            item.end_time = helper.datetime(item.end_time, 'yyyy-mm-dd');
        });
        // 更新用户徽章数据
        await this.userModel.where({ openid: this._userInfo.openid }).update({badge: badgeList, personal_achivement: personTotal, team_achivement: teamTotal});
        curUser = await this.userModel.where({ openid: this._userInfo.openid }).find().catch(e => this.error(e.message));
        return this.ok('success', {
            personTotal: curUser.personal_achivement,
            teamTotal: curUser.team_achivement,
            userData: curUser,
            waitGet,
            hasGet
        });
    }
    async getDateListAction() {
        //存入过信息的user;
        let hasLoginUser = [];
        let userList = await this.userModel.where().select().catch(e => this.error(e.message));
        // 更新用户徽章
        let curUser = await this.userModel.where({ openid: this._userInfo.openid }).find().catch(e => this.error(e.message));
        // 用户去空
        userList.forEach(item => {
            if (item.openid) {
                hasLoginUser.push(item);
            }
        });
        hasLoginUser.sort((a, b)=>{
            return b.personal_achivement - a.personal_achivement;
        });
        return this.ok('success', {
            hasLoginUser,
            personTotal: curUser.personal_achivement,
            teamTotal: curUser.team_achivement,
        });
    }
    async getTeamListAction() {
        //存入过信息的user;
        let hasLoginUser = [];
        let userList = await this.userModel.where().select().catch(e => this.error(e.message))
        let personTotal = 0;
        let teamTotal = 0;
        let groupList = {};
        userList.forEach(item => {
            if (item.openid === this._userInfo.openid) {
                personTotal = item.personal_achivement;
                teamTotal = item.team_achivement;
            }
            if (item.openid) {
                hasLoginUser.push(item);
            }
        });
        hasLoginUser.forEach((item) => {
            if (!groupList.hasOwnProperty(item.group)) {
                groupList[item.group] = {};
                groupList[item.group]['member'] = [];
                groupList[item.group]['group'] = item.group;
                groupList[item.group]['member'].push(item);
                groupList[item.group]['sub'] = item.team_achivement;
            } else {
                groupList[item.group]['member'].push(item);
                groupList[item.group]['sub'] += item.team_achivement;
            }
        });
        return this.ok('success', {
            personTotal,
            teamTotal,
            groupList
        });
    }

};


