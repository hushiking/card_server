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
    }
};