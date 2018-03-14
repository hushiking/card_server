/**
 * Middleware config
 * @return
 */
module.exports = { 
    list: ['model'], //加载的中间件列表
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
            db_pwd: 'ls80779', // 密码
            db_prefix: '', // 数据库表前缀
            db_nums_per_page: 20, //查询分页每页显示的条数
            db_ext_config: { //数据库连接时候额外的参数
                db_log_sql: true, //打印sql
                read_write: false, //读写分离(mysql, postgresql)
                db_pool_size: 10, //连接池大小
            }
        }
    }
};