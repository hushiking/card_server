/**
 * 函数库
 * @author     richen
 * @copyright  Copyright (c) 2014- <richenlin(at)gmail.com>
 * @license    MIT
 * @version    15/1/15
 */
const crypto = require('crypto');
const requestp = require('request-promise');

let lib = {};
/**
 * 获取AuthCenter AccessToken
 * @returns {*}
 */
lib.getAccessToken = function () {
    //请求AuthCenter获取access_token
    let access_token = '';
    return requestp({
        uri: `${think.config('auth_center.uri')}/oauth/token`,
        method: 'POST',
        form: {
            client_id: think.config('client_id'),
            client_secret: think.config('client_secret')
        },
        timeout: 10000
    }).then(res => {
        let timeout = 0;
        try {
            let rdata = JSON.parse(res);
            if (rdata.status == 1) {
                access_token = rdata.data.token || '';
                timeout = think.toInt(rdata.data.timeout) || 3600;
            } else {
                throw Error('request access_token error');
            }
        } catch (e) {
            access_token = '';
        }
        return access_token;
    }).catch(e => {
        throw Error('request access_token error');
    });
};


/**
 * 验证access_token
 * 
 * @param {any} client_id 
 * @param {any} access_token 
 * @returns 
 */
lib.checkAccessToken = function (client_id, access_token) {
    //请求AuthCenter验证access_token
    return requestp({
        uri: `${think.config('auth_center.uri')}/oauth/verify`,
        method: 'POST',
        form: {
            client_id: client_id || '',
            access_token: access_token || '',
            sign_type: 'oauth'
        },
        timeout: 10000
    }).then(res => {
        try {
            let rdata = JSON.parse(res);
            if (rdata.status == 1) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }).catch(e => {
        return false;
    });
};

/**
 * md5签名算法
 * 
 * @param {any} params 
 * @param {any} client_id 
 * @returns 
 */
lib.md5Sign = function (params, client_id) {
    if (think.isEmpty(params)) {
        return '';
    }
    for (let v in params) {
        if (v.toLowerCase() === 'access_token') {
            delete params[v];
        }
    }
    let keys = Object.keys(params);
    keys.sort();

    let paramvalue = '';
    for (let k of keys) {
        paramvalue = `${paramvalue}${k}${params[k]}`;
    }
    paramvalue = `${client_id}${paramvalue}${client_id}`;
    paramvalue = new Buffer(paramvalue, 'utf8');
    return think.md5(paramvalue).toString('hex').toUpperCase();
};

/**
 * md5签名验证
 * 
 * @param {any} params 
 * @param {any} sign 
 * @returns 
 */
lib.checkMd5Sign = function (params, sign) {
    if (think.isEmpty(params) || think.isEmpty(params.client_id) || think.isEmpty(sign)) {
        return false;
    }
    //echo(lib.md5Sign(params, params.client_id))
    //echo(sign)
    if (sign === lib.md5Sign(params, params.client_id)) {
        return true;
    } else {
        return false;
    }
};

/**
 * 微服务接口调用
 * @param signType md5: md5 sign方式请求 ;oauth: 需要AuthCenter access_token
 * @param param 参数对象
 * @param uri 请求uri
 * @param method 请求方式
 * @param json 如果接口返回的数据为JSON,自动解析。如果返回的非json请设为false
 * @return {*}
 */
lib.callServiceCenter = async function (param = {}, uri, method = 'GET', signType = 'oauth', json = true) {
    let access_token = '';
    if (signType === 'oauth') {
        param.sign_type = 'oauth';
        access_token = await lib.getAccessToken();
    } else {
        param.sign_type = 'md5';
        //追加client_id参数
        param.client_id = think.config('client_id');
        access_token = lib.md5Sign(param, param.client_id);
    }
    //
    let options = {
        uri: uri,
        timeout: 10000
    };
    if (json) {
        options.json = true; // Automatically parses the JSON string in the response
    }

    if (method.toUpperCase() == 'GET') {
        //get请将access_token放入header,防止参数过长
        options.headers = { 'X-Access-Token': access_token };
        options.qs = param; // object -> uri + '?access_token=xxxxx%20xxxxx'
        options.method = 'GET';

        return requestp(options).catch(e => {
            think.addLogs('callServiceCenter', JSON.stringify(e));
            throw Error('api request error');
        });
    } else {
        param.access_token = access_token;
        options.form = param;
        options.method = method;

        return requestp(options).catch(e => {
            think.addLogs('callServiceCenter', JSON.stringify(e));
            throw Error('api request error');
        });
    }
};

/**
 * 生成uid
 * @param length
 * @returns {string}
 */
lib.uuid = function (length) {
    let str = crypto.randomBytes(Math.ceil(length * 0.75)).toString('base64').slice(0, length);
    return str.replace(/[\+\/]/g, '_');
};

/**
 * 随机数字串
 * @param length
 * @returns {string}
 */
lib.getRandomNumber = function (length) {
    if (!think.isNumber(length) || length < 1) {
        return '';
    }
    let str = '9876543210';
    let n = str.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += str.charAt(Math.floor(Math.random() * n));
    }
    return result;
};

/**
 * 随机数字字母串
 * @param length
 * @returns {string}
 */
lib.getRandomString = function (length) {
    if (!think.isNumber(length) || length < 1) {
        return '';
    }

    let str = '9876543210ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let n = str.length;
    let result = '';
    for (let i=0;i< length; i++) {
        result += str.charAt(Math.floor(Math.random()*n));
    }
    return result;
};

module.exports = lib;