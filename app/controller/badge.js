/**
 * Controller
 * @return
 */
const {controller, helper} = require('thinkkoa');
const badgeModel = require('../model/badge');
const userModel = require('../model/user');
const logicService = require('../service/common/logic');
const admin_base = require('../common/admin_base.js');
module.exports = class extends admin_base {
    //构造方法
    init(ctx, app){
        //调用父类构造方法
        super.init(ctx, app);
        this.Model = new badgeModel(this.app.config('config.model', 'middleware'));
        this.useModel = new userModel(this.app.config('config.model', 'middleware'));
    }
    //所有该控制器(含子类)方法前置方法
    //indexAction前置方法
    _before_index(){
        console.log('_before_index');
    }
    
    //控制器默认方法
    indexAction () {
        return this.ok('success');
    }

    // 获取数据
    async getDateAction() {
        let openid = this.param('openid');
        let userData = await this.useModel.where({openid:openid}).find().catch(e => this.error(e.message))
        let personTotal = 0
        let teamTotal = 0
        //TODO: 以后改成循环
        // userData.badge[0]
        let badgeData =  await this.Model.where({ id: 1}).find().catch(e => this.error(e.message))
        personTotal += badgeData.Personal
        teamTotal += badgeData.team
        // userData.badge.forEach((value) => {
        //     console.log(value)
        //     let badgeData =  this.Model.where({ id: value }).find().catch(e => this.error(e.message))
        //     console.log(badgeData)
        //     personTotal += badgeData.Personal
        //     teamTotal += badgeData.team
        // })
        return this.ok('success', {
            personTotal,
            teamTotal,
            userData
        })
    }
    async getDateListAction() {
        let openid = this.param('openid');
        let userList = await this.useModel.where().select().catch(e => this.error(e.message))
        let personTotal = 0
        let teamTotal = 0
        //TODO: 以后改成循环
        // userData.badge[0]
        let badgeData =  await this.Model.where({ id: 1}).find().catch(e => this.error(e.message))
        personTotal += badgeData.Personal;
        teamTotal += badgeData.team;
        userList.forEach(item => {
            item.personTotal = 135;
        });
        // userData.badge.forEach((value) => {
        //     console.log(value)
        //     let badgeData =  this.Model.where({ id: value }).find().catch(e => this.error(e.message))
        //     console.log(badgeData)
        //     personTotal += badgeData.Personal
        //     teamTotal += badgeData.team
        // })
        return this.ok('success', {
            personTotal,
            teamTotal,
            userList
        })
    }
    async getTeamListAction() {
        let openid = this.param('openid');
        let userList = await this.useModel.where().select().catch(e => this.error(e.message))
        let personTotal = 0
        let teamTotal = 0
        //TODO: 以后改成循环
        // userData.badge[0]
        let badgeData =  await this.Model.where({ id: 1}).find().catch(e => this.error(e.message))
        personTotal += badgeData.Personal;
        teamTotal += badgeData.team;
        // echo(teamTotal);
        userList.forEach(item => {
            item.teamAchieveNum = 9;
        });
        // userData.badge.forEach((value) => {
        //     console.log(value)
        //     let badgeData =  this.Model.where({ id: value }).find().catch(e => this.error(e.message))
        //     console.log(badgeData)
        //     personTotal += badgeData.Personal
        //     teamTotal += badgeData.team
        // })
        return this.ok('success', {
            personTotal,
            teamTotal,
            userList
        })
    }
    
};


