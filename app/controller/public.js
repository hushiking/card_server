/**
 * Controller
 * @return
 */
let func = require('../util/func');
let requestp = require('request-promise');
const {controller, helper} = require('thinkkoa');
const userModel = require('../model/user');
// const admin_base = require('../common/admin_base.js');
module.exports = class extends controller {
    //构造方法
    init(ctx, app){
        //调用父类构造方法
        super.init(ctx, app);
        // 定义数据对象
        this.Model = new userModel(this.app.config('config.model', 'middleware'));
        // this.notifyS = helper.service('notify', {});
        // this.toolS = helper.service('tool', {});
        // this.storeS = helper.service('store', {});
        // this.orderS = helper.service('order', {});
    }


    // async testAction() {
    //     let info = await think.service('store', {}).checkLastFreeTimesInit('13031070792,13031070793,13031070794', 10);
    //     // let info = await think.service('store', {}).checkLastFreeTimesMinus('13031070792');
    //     return this.ok('ss', info);
    // }

    /**
     * 微信小程序登录
     * 
     * @returns 
     */
    async wxLoginAction() {
        let code = this.param('code');
        let userInfo = JSON.parse(this.param('userInfo'));
        if (helper.isEmpty(code)) {
            return this.fail('缺少参数：code' );
        }
        
        //微信请求接口：jscode2session
        let obj = {};
        obj.js_code = code;
        obj.appid = 'wxa9b7906bb1935d2c';
        obj.secret = '7b566f0566026a9c203ba855f83be6ed';
        obj.grant_type = 'authorization_code';

        let result = await requestp({
            uri: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            qs: obj,
        }).catch(e => {
            helper.addLogs('wx', JSON.stringify(e));
        });
        try {
            result = JSON.parse(result);
        } catch (error) {
            result = {};
        }
        if (result.openid && result.session_key) {
            let data = await this.Model.where({phonenum: userInfo.phonenum}).find();
            if(Object.keys(data).length<=0){
                return this.fail('您没有访问权限，请联系管理员');
            }
            // 如果不存在openid 创建user
            let ranStr = await func.getRandomString(32);
            if(!data.openid){
                data.avatar_url = userInfo.avatarUrl;
                data.gender = userInfo.gender;
                data.nickname = userInfo.nickName;
                data.real_name = userInfo.nickName;
                data.card = [];
                data.message = [];
                data.badge = [1];
                data.openid = result.openid;
                data.create_time = helper.datetime();
                await this.Model.where({id: data.id}).update(data).catch(e => this.error(e.message));
                await this.app.cache(ranStr, {openid: result.openid, session_key: result.session_key, nickname: data.nickname, group: data.group, avatar_url: data.avatar_url});
                return this.ok('success', {session_key: ranStr});
            }else{
                await this.app.cache(ranStr, {openid: result.openid, session_key: result.session_key, nickname: data.nickname, group: data.group, avatar_url: data.avatar_url});
                return this.ok('success', {session_key: ranStr});
            }
        } else {
            return this.fail('您没有登录权限请重新登录');
        }
    }
    
    /**
     * 发送短信
     * 
     * @returns 
     */
    async sendSmsAction() {
        let phonenum = this.param('phonenum');
        if (helper.isEmpty(phonenum)) {
            return this.fail('缺少参数：phonenum');
        }

        let beidiao_session_key = this.param('session_key');
        if (!helper.isEmpty(beidiao_session_key)) {
            //带session_key来自小程序，需要进行白名单检测
            //白名单检测
            let checkRes = await this.toolS.checkWhiteList(phonenum);
            if (!checkRes) {
                //记录非白名单人员
                await this.storeS.checkNewNameListAdd(phonenum);
                return this.fail('此版本仅供内测用户使用，如有需要请联系010-82102927');
            }
        }

        let code = await func.getRandomNumber(6);
        await helper.cache(`${helper.config('verify_code_key')}${phonenum}`, code, 10*60);
        await this.notifyS.sendSms(phonenum, code);
        return this.ok('success');
    }

    /**
     * 获取检查项
     * 
     * @returns 
     */
    async checkSelectListAction() {
        let list = await this.toolS.getCheckItems();
        list = list.map(item => {
            return {
                product_id: item.product_id,
                product_name: item.product_name,
                product_price: item.product_price
            };
        });
        return this.ok('success', list);
    }

    /**
     * 微信支付结果回调
     * 
     */
    async wxPayCallbackAction(){
        //{ xml:
        // { 
        //     appid: [ 'wxbda7a6bff2978913' ],
        //     bank_type: [ 'CFT' ],
        //     cash_fee: [ '1' ],
        //     fee_type: [ 'CNY' ],
        //     is_subscribe: [ 'N' ],
        //     mch_id: [ '1328265101' ],
        //     nonce_str: [ 'Z3JA64C5WIS80GRWXCDFR0BC7DIYIB81' ],
        //     openid: [ 'oxIf00Mj3ku1deNcYnblGThPEVGA' ],
        //     out_trade_no: [ '20171031112937561810' ],
        //     result_code: [ 'SUCCESS' ],
        //     return_code: [ 'SUCCESS' ],
        //     sign: [ 'EB61A8A74A2C2816536408CEC729D361' ],
        //     time_end: [ '20171031144741' ],
        //     total_fee: [ '1' ],
        //     trade_type: [ 'JSAPI' ],
        //     transaction_id: [ '4200000001201710311473478309' ] 
        // } 
        //}
        helper.addLogs('wx_pay', ['wxPayCallback', this.param()]);

        //转成对象
        let params = this.param();
        let result = {};
        for (let key in params.xml) {
            result[key] = params.xml[key][0];
        }

        //拿到订单号
        if (result && result.result_code === 'SUCCESS' && result.return_code === 'SUCCESS') {
            if (result.out_trade_no) {
                this.orderS.finishPay(result.out_trade_no);
                return this.ok('success');
            }
        }
        return this.fail('获取out_trade_no失败');
    }
}