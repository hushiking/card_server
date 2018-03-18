/**
 * Controller
 * @return
 */
const { controller, helper } = require('thinkkoa');
const badgeModel = require('../model/badge');
const userModel = require('../model/user');
const admin_base = require('../common/admin_base.js');
module.exports = class extends admin_base {
    //构造方法
    init(ctx, app) {
        //调用父类构造方法
        super.init(ctx, app);
        this.Model = new badgeModel(this.app.config('config.model', 'middleware'));
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
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

    // 获取数据
    async getDateAction() {
        let personTotal = 0;
        let teamTotal = 0;
        let userData = await this.userModel.where({ openid: this._userInfo.openid }).find().catch(e => this.error(e.message))
        personTotal = userData.personal_achivement;
        teamTotal = userData.team_achivement;
        echo(userData.badge);
        //TODO: 以后改成循环
        // userData.badge[0]
        // let badgeData =  await this.Model.where({ id: userData.badge}).select().catch(e => this.error(e.message))
        // echo(badgeData);
        // personTotal += badgeData.Personal
        // teamTotal += badgeData.team
        // let badgeData =  this.Model.where({ id: value }).find().catch(e => this.error(e.message));
        return this.ok('success', {
            personTotal,
            teamTotal,
            userData
        })
    }
    async getDateListAction() {
        //存入过信息的user;
        let hasLoginUser = [];
        let userList = await this.userModel.where().select().catch(e => this.error(e.message))
        let personTotal = 0;
        let teamTotal = 0;
        userList.forEach(item => {
            if (item.openid === this._userInfo.openid) {
                personTotal = item.personal_achivement;
                teamTotal = item.team_achivement;
            }
            if (item.openid) {
                hasLoginUser.push(item);
            }
        });
        return this.ok('success', {
            hasLoginUser,
            personTotal,
            teamTotal
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
            if(!groupList.hasOwnProperty(item.group)){
                groupList[item.group] = {};
                groupList[item.group]['member'] = [];
                groupList[item.group]['group'] = item.group;
                groupList[item.group]['member'].push(item);
                groupList[item.group]['sub'] = item.team_achivement;
            }else{
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


