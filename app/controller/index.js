/**
 * Controller
 * @return
 */
const {controller, helper} = require('thinkkoa');
const admin_base = require('../common/admin_base.js');
module.exports = class extends admin_base {
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
        return this.ok('success');
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
        return this.ok('session未失效');
    }
};