/**
 * Service
 * @return
 */
const {base, helper} = require('thinkkoa');

module.exports = class extends base {

    /**
     * 根据查询条件生成分页结果列表
     * @param model
     * @param map
     * @param mo
     * @private
     */
    async list(model, map, mo){
        if (helper.isEmpty(model)) {
            return Promise.resolve([]);
        } else {
            if (helper.isEmpty(mo.field)) {
                mo.field = [];
            }
            if (helper.isEmpty(mo.ispage)) {
                mo.ispage = true;
            }
            if (helper.isEmpty(mo.pagesize)) {
                mo.pagesize = 20;
            }
            if (helper.isEmpty(mo.rel)) {
                mo.rel = {};
            } else {
                if (mo.rel === true){
                    mo.rel = {model: true};
                }
            }
            if (helper.isEmpty(map)) {
                map = {};
            }
            if (helper.isEmpty(mo.sortby)) {
                let pk = await model.getPk();
                mo.sortby = {[pk]: 'DESC'};
            }
            if (mo.ispage === true) {
                return model.field(mo.field).rel(mo.rel.model ? mo.rel.model : false, mo.rel.option ? mo.rel.option : {}).where(map).order(mo.sortby).countSelect({page: mo.page, num: mo.pagesize}).then(data => {
                    return data;
                }).catch(e => {
                    return {count: 0, total: 0, page: mo.page, data: []};
                });
            } else {
                return model.field(mo.field).rel(mo.rel.model ? mo.rel.model : false, mo.rel.option ? mo.rel.option : {}).where(map).order(mo.sortby).select().then(data => {
                    return data;
                }).catch(e => {
                    return [];
                });
            }
        }
    }

    /**
     * 根据查询条件生成分页结果列表
     * @param model
     * @param sql 不带limit,查询list的sql
     * @param mo
     * @private
     */
    async sqlList(model, sql, mo = {}){
        if (helper.isEmpty(model)) {
            return Promise.resolve([]);
        } else {
            if (helper.isEmpty(mo.ispage) && mo.ispage != false) {
                mo.ispage = true;
            }
            if (helper.isEmpty(mo.pagesize)) {
                mo.pagesize = 20;
            }
            if (helper.isEmpty(mo.page)) {
                mo.page = 1;
            }
            if (mo.ispage === true) {
                let curpagedata = {'page': mo.page, 'num': mo.pagesize};
                let count = await model.query('select count(*) as totalcount from (' + sql + ') as counttable');
                curpagedata['count'] = helper.toInt(helper.isEmpty(count[0]['totalcount']) ? 0 : count[0]['totalcount']);
                if (curpagedata['count'] % mo.pagesize === 0) {
                    curpagedata['total'] = helper.toInt(curpagedata['count'] / mo.pagesize);
                } else {
                    curpagedata['total'] = helper.toInt(curpagedata['count'] / mo.pagesize) + 1;
                }

                if (mo.page > curpagedata['total']) {
                    mo.page = curpagedata['total'];
                }
                curpagedata['num'] = helper.toInt(mo.pagesize);
                curpagedata['page'] = helper.toInt(mo.page);
                curpagedata['data'] = await model.query(sql + ' limit ' + (mo.page - 1 < 0 ? 0 : mo.page - 1) * mo.pagesize + ',' + mo.pagesize);
                return Promise.resolve(curpagedata);
            } else {
                return model.query(sql);
            }
        }
    }

    /**
     * 根据传入数据生成分页
     * 
     * @param {Array} data 
     * @param {int} page 
     * @param {int} pagesize 
     * @returns 
     */
    dataList(data, page, pagesize) {
        let res = {count: 0, total: 0, page: page, data: []};
        if (!helper.isArray(data)) {
            return res;
        }
        res.count = data.length || 0;
        if (res.count % pagesize === 0){
            res.total = helper.toInt(res.count / pagesize);
        } else {
            res.total = helper.toInt(res.count / pagesize) + 1;
        }
        if (page > res.total) {
            page = res.total;
        }
        res.data = data.slice((page - 1 < 0 ? 0 : page - 1) * pagesize, pagesize);
        return res;
    }
};