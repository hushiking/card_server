/**
 * Service
 * @return
 */
const XLSX = require('xlsx');
const { base, helper } = require('thinkkoa');
const userModel = require('../../model/user');
module.exports = class extends base {
    init(app) {
        this.app = app;
        this.userModel = new userModel(this.app.config('config.model', 'middleware'));
    }


    /**
       * 导入用户文件
       * 
       * @param {any} filePath 
       * @returns 
       */
    async importCallGroupUsers(filePath) {
        if (helper.isEmpty(filePath)) {
            throw Error('文件路径为空');
        }

        let workbook = XLSX.readFile(filePath);
        if (workbook.SheetNames.length === 0) {
            throw Error('文件内容为空');
        }

        let sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[sheet_name];
        let callGroupUserDatas = XLSX.utils.sheet_to_json(worksheet);

        echo(callGroupUserDatas);
      
        if (callGroupUserDatas.length === 0) {
            throw Error('文件用户不存在');
        }
        let promiseList = [];
        let userData = {};
        callGroupUserDatas.map((item)=>{
            userData.badge = [];
            userData.nickname = '';
            userData.message = [];
            userData.card = [];
            userData.login_list = [];
            userData.real_name = item.real_name;
            userData.group_name = item.group_name;
            userData.group = item.group;
            userData.phonenum = item.phonenum;
            promiseList.push(this.userModel.add(Object.assign({}, userData)).catch(e => this.error(e.message)));
        });
        return Promise.all(promiseList);
       
        
    }
    

};