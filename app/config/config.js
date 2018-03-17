/**
 * Config
 * @return
 */

module.exports = {
    /*app config*/
    app_port: 3001, // 监听端口
    app_hostname: '127.0.0.1', // Hostname
    encoding: 'utf-8', //输出数据的编码

    logs: true, //是否存储日志
    logs_path: process.env.ROOT_PATH + '/logs', //存储日志文件目录
    logs_level: ['warn', 'error'], //日志存储级别, 'info', 'warn', 'error', 'success' or custom type

    /*project config */
    app_title: 'thinkkoa app',
    app_version: '1.0.0',
    app_keywords: 'thinkkoa,app',
    app_description: 'application created by thinkkoa',

    // NFS上传配置
    nfs: {
        max_file_size: 100 * 1024 * 1024, //上传文件大小限制，默认100M
        file_allow_type: 'jpg|jpeg|png|gif|xlsx|xls|csv|doc|ppt|mp3', //允许上传的文件类型
        file_save_path: process.env.ROOT_PATH + '/nfs/'
    },
    store_option: {
        type: 'redis', //数据缓存类型 file,redis,memcache
        key_prefix: 'BackgroundCheck:', //缓存key前置

        redis_host: '127.0.0.1',
        redis_port: 6379,
        redis_password: '',
        redis_db: '0',
        redis_timeout: 5000, //try connection timeout
    },
    //queue config
    queue_option: {
        redis_host: '127.0.0.1',
        redis_port: 6379,
        redis_password: '',
        redis_db: '1',
        redis_timeout: 5000, //try connection timeout
        queue_blocktimeout: 60,
        queue_maxretry: 3
    }
};