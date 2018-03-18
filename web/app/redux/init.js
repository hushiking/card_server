import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import I from 'immutable';
import { createLogger } from 'redux-logger';
import { compose } from 'redux';
import rootReducer from './reducers/index';
import { hashHistory } from 'react-router';
import asyncAction from '../redux/middleware/async-action';
// import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();
const middlewareRoute = routerMiddleware(hashHistory);

// 定义不同环境需要的中间件
let devThunkMiiddleware = [asyncAction, thunkMiddleware, loggerMiddleware, middlewareRoute];
let proThunkMiiddleware = [asyncAction, thunkMiddleware, middlewareRoute];
// 判断开发环境 是否增加logger 中间件
// export default Store;
export default function create(initState = I.Map()) {
    if (process.env.NODE_ENV === 'development') {
        let { persistState } = require('redux-devtools');
        const enhancer = compose(
            applyMiddleware(...devThunkMiiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f,
            persistState(
                window.location.href.match(
                    /[?&]debug_session=([^&#]+)\b/
                )
            )
        );
        let store = createStore(
            rootReducer,
            initState,
            enhancer
        );
        // if (module.hot) {
        //     module.hot.accept('./reducers', () =>
        //         store.replaceReducer(require('./reducers'))
        //     );
        // }
        return store;
    }
    return createStore(rootReducer, initState, applyMiddleware(...proThunkMiiddleware));
}

