/**
 * Controller
 * @return
 */
const {controller, helper} = require('thinkkoa');

module.exports = class extends controller {
    //构造方法
    init(ctx, app){
        //调用父类构造方法
        super.init(ctx, app);
    }
    //所有该控制器(含子类)方法前置方法
    async __before(){
        let beidiao_session_key = this.param('session_key');
        if (helper.isEmpty(beidiao_session_key)) {
            return this.fail('缺少参数：session_key');
        }
        let userInfo = await this.app.cache(beidiao_session_key);
        if (helper.isEmpty(userInfo)) {
            return this.fail('session失效，请重新登录');
        }
        this._userInfo = userInfo;
        this._beidiao_session_key = beidiao_session_key;
    }

    //URI定位到该控制器,如果该控制器不存在某个方法时自动调用
    __empty(){
        return this.json('can\'t find action');
    }
    //indexAction前置方法
    _before_index(){
        // console.log('_before_index');
    }
    //控制器默认方法
    indexAction () {                                                                                                           
        return this.ok('success');
    }
    
};
