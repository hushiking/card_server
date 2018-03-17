/**
 * Middleware config
 * @return
 */
module.exports = { 
    list: ['model', 'cache', 'session', 'view'], //加载的中间件列表
    config: { //中间件配置 
        static: {
            cache: false
        },
        model: {
            db_type: 'mysql', // 数据库类型,支持mysql,mongo,postgressql
            db_host: '127.0.0.1', // 服务器地址
            db_port: 3306, // 端口
            db_name: 'card_server', // 数据库名
            db_user: 'root', // 用户名
            db_pwd: 'richenlin', // 密码
            db_prefix: '', // 数据库表前缀
            db_nums_per_page: 20, //查询分页每页显示的条数
            db_ext_config: { //数据库连接时候额外的参数
                db_log_sql: true, //打印sql
                read_write: false, //读写分离(mysql, postgresql)
                db_pool_size: 10, //连接池大小
            }
        },
        cache: {
            cache_type: 'redis', //数据缓存类型 file,redis,memcache
            cache_key_prefix: 'BackgroundCheck:', //缓存key前置
            cache_timeout: 6 * 3600, //数据缓存有效期，单位: 秒

            redis_host: '127.0.0.1',
            redis_port: 6379,
            redis_password: '',
            redis_db: '0',
            redis_timeout: 10, //try connection timeout
        },
        session: {
            session_type: 'redis', //数据缓存类型 file,redis,memcache
            session_name: 'BackgroundCheck', //session对应的cookie名称
            session_key_prefix: 'BackgroundCheck:', //session名称前缀
            session_options: {}, //session对应的cookie选项
            session_sign: '', //session对应的cookie使用签名
            session_timeout: 24 * 3600, //服务器上session失效时间，单位：秒

            // session_type=redis
            redis_host: '127.0.0.1',
            redis_port: 6379,
            redis_password: '',
            redis_db: '0',
            redis_timeout: 10, //try connection timeout
        },
        view: {
            view_path: process.env.ROOT_PATH + '/static/views/', //模板目录
            engine_config: { cache: false }, //模版引擎配置
            default_theme: '', //默认模板主题
        }
        
    }
};