export default {
    path: 'home',
    onEnter: () => {
        // return false;
        // this.con.router.push(`/`);
    },
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../page/home'));
        });
    },
    indexRoute: {
        getComponent(location, cb) {
            require.ensure([], (require) => {
                cb(null, require('../../page/user'));
            });
        }
    },
    childRoutes: [
        {
            path: 'user',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/user'));
                });
            }
        },
        {
            path: 'subject',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/subject'));
                });
            }
        },
        {
            path: 'class_monitor',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/class_monitor'));
                });
            }
        }
    ]
    // childRoutes: [
    //     {
    //         path: 'consumers',
    //         getComponent(location, cb) {
    //             require.ensure([], (require) => {
    //                 cb(null, require('../../page/consumers'));
    //             });
    //         }
    //     }
    // ]
};
