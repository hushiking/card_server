/**
 * Controller
 * @return
 */
const {controller, helper} = require('thinkkoa');
const admin_base = require('../common/admin_base.js');
module.exports = class extends controller {
    //构造方法
    init(ctx, app){
        //调用父类构造方法
        super.init(ctx, app);
    }
    //indexAction前置方法
    _before_index(){
        // console.log('_before_index');
    }
    //控制器默认方法
    indexAction () {                                                                                                           
        return this.display();
    }
    saveUserAction () {
        return this.ok('success');
    }
    /**
     * 验证微信小程序session是否有效
     * 
     * @returns 
     */
    async wxCheckAction() {
        let beidiao_session_key = this.param('session_key');
        if (helper.isEmpty(beidiao_session_key)) {
            return this.fail('缺少参数：session_key', {islogin: true});
        }
        let userInfo = await this.app.cache(beidiao_session_key);
        if (helper.isEmpty(userInfo)) {
            return this.fail('session失效，请重新登录', {islogin: true});
        }
        this._userInfo = userInfo;
        this._beidiao_session_key = beidiao_session_key;
        return this.ok('session未失效');
    }
};