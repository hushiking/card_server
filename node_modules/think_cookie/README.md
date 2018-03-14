# 介绍
-----

[![npm version](https://badge.fury.io/js/think_cookie.svg)](https://badge.fury.io/js/think_cookie)
[![Dependency Status](https://david-dm.org/thinkkoa/think_cookie.svg)](https://david-dm.org/thinkkoa/think_cookie)

Middleware Cookie for ThinkKoa.

# 安装
-----

```
npm i think_cookie
```

# 使用
-----

1、项目中增加中间件 middleware/cookie.js
```js
module.exports = require('think_cookie');
```

2、项目中间件配置 config/middleware.js:
```
config: { //中间件配置
    ...,
    cookie: {
        domain: '',  // cookie所在的域名
        path: '/',       // cookie所在的路径
        // maxAge: -1, // cookie有效时长
        httpOnly: true,  // 是否只用于http请求中获取
        overwrite: false,  // 是否允许重写
        //expires: new Date('2017-02-15')  // cookie失效时间
    }
}
```