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
            path: 'comment',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/comment'));
                });
            }
        },
        {
            path: 'star',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/star'));
                });
            }
        },
        {
            path: 'message',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/message'));
                });
            }
        },
        {
            path: 'card',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/card'));
                });
            }
        },
        {
            path: 'feedback',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/feedback'));
                });
            }
        },
        {
            path: 'role',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/role'));
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
