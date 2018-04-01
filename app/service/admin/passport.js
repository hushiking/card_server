/**
 * Service
 * @return
 */
const { base, helper } = require('thinkkoa');
const authUserModel = require('../../model/auth_user');
module.exports = class extends base {
    init(app) {
        this.app = app;
        this.authUserModel = new authUserModel(this.app.config('config.model', 'middleware'));
    }

    /**
     *
     * @param username
     * @param password
     * @param clientIp
     * @returns {*}
     */
    async loginAdmin(username, password, clientIp) {
        if (helper.isEmpty(username) || helper.isEmpty(password)) {
            return null;
        }
        let adminList = await this.authUserModel.select();
        for (let admin of adminList) {
            if (admin.account == username && admin.password == password) {
                return {
                    username: username,
                    role: admin.auth_role
                };
            }
        }
        return null;
    }
};