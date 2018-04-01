/**
 * Controller
 * @return
 */
const {controller, helper} = require('thinkkoa');
const adminPassport = require('../service/admin/passport');

module.exports = class extends controller {
    //构造方法
    init(ctx, app){
        //调用父类构造方法
        super.init(ctx, app);
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
                let token = this.ctx.jwtEncode({userid: user.username});
                return this.ok('登录成功', { access_token: token, nickname: user.username, role: user.role, icon: ''});
            }
        } else {
            return this.fail('仅支持post方式');
        }
    }
};