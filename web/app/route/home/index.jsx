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
            path: 'feedback',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../page/feedback'));
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
