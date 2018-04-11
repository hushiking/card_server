/**
 * Middleware
 * @return
 */
const { helper } = require('thinkkoa');
const schedule = require('node-schedule');
const userSendCard = require('../service/common/user_send_card');
module.exports = function (options, app) {
    app.once('appReady', () => {
        //每5分执行一次
        let rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(1, 6)];
        rule.hour = 0;
        rule.minute = 0;
        // let times = [1, 2, 3, 4, 5, 6, 11, 16,17, 18,19,20, 21, 26, 31, 36, 41, 46, 51, 56, 57, 58,59];
        // rule.minute = times;
        schedule.scheduleJob(rule, function(){
            let userSendCardT= new userSendCard(app);
            userSendCardT.reSetUserCardTimes(1);
        });
    });
    return function (ctx, next) {
        return next();
    };
};