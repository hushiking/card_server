/**
 *
 * @author     richen
 * @copyright  Copyright (c) 2017 - <richenlin(at)gmail.com>
 * @license    MIT
 * @version    17/4/29
 */
const lib = require('think_lib');

/**
 * default options
 */
const defaultOptions = {
    domain: '',  // cookie所在的域名
    path: '/',       // cookie所在的路径
    // maxAge: -1, // cookie有效时长
    httpOnly: true,  // 是否只用于http请求中获取
    overwrite: false,  // 是否允许重写
    //expires: new Date('2017-02-15')  // cookie失效时间
};

module.exports = function (options, app) {
    options = options ? lib.extend(defaultOptions, options, true) : defaultOptions;
    return function (ctx, next) {
        /**
         * get or set cookie
         * @param {String} name
         * @param {String} value
         * @param {Object} options
         */
        lib.define(ctx, 'cookie', function (name, value, option = {}) {
            if (!lib.isString(name)) {
                ctx.throw('cookie.name must be a string');
                return null;
            }
            //get cookie
            if (value === undefined) {
                return ctx.cookies.get(name, option);
            }
            option = lib.extend(options, option || {});
            //remove cookie
            if (value === null) {
                return ctx.cookies.set(name, '', {
                    maxAge: -1
                });
            }
            if (!lib.isString(value)) {
                ctx.throw('cookie value must be a string');
                return null;
            }
            //http://browsercookielimits.squawky.net/
            if (value.length >= 4094) {
                ctx.throw('cookie limit has error length');
                return null;
            }
            //set cookie
            return ctx.cookies.set(name, value, option);
        });

        return next();
    };
};

