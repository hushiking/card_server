/**
 * Service
 * @return
 */
const { helper, controller } = require('thinkkoa');
const userModel = require('../../model/user');
module.exports = class extends controller {
    init(app) {
        this.app = app;
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
    }

    /**
     * 客户余量预警
     * type: balance
     * 
     */
    async reSetUserCardTimes(times, type = 'all', multiSelectArr) {
        let send_card_power_status;
        if(Number(times)){
            send_card_power_status = 1;
        }else{
            send_card_power_status = 0;
        }
        switch (type) {
            case 'all':
                {
                    let userList = await this.userModel.where().select().catch(e => { });
                    let promiseList = [];
                    userList.forEach((item) => {
                        promiseList.push(this.userModel.where({ id: item.id }).update({send_card_times: times, send_card_power: send_card_power_status}).catch(e => this.error(e.message)));
                    });
                }
                break;
            case 'multiSelect':
                { 
                    let userList = await this.userModel.where({ id: multiSelectArr }).select().catch(e => { });
                    let promiseList = [];
                 
                    userList.forEach((item) => {
                        promiseList.push(this.userModel.where({ id: item.id }).update({send_card_times: times, send_card_power: send_card_power_status}).catch(e => this.error(e.message)));
                    });
                    Promise.all(promiseList).then(function (values) {
                        // console.log(values);
                    });
                }
                break;

            default:
                break;
        }

    }
};