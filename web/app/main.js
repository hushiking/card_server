// import I from 'immutable';
import React from 'react';
import I from 'immutable';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import initStore from './redux/init';

(() => {
    const routes = require('./route');
    // Add the reducer to your store on the `routing` key
    const store = initStore(I.fromJS({}));
    window.store = store;

    let lastRoute = null;
    let lastRouteJS = null;

    // http://stackoverflow.com/questions/33376414/adding-a-base-url-to-an-app-using-redux-router-react-router
    // https://hashnode.com/post/how-to-use-react-router-redux-with-immutablejs-ciserp17q0wm1zz53g5ytdohh

    const history = syncHistoryWithStore(hashHistory, store, {
        selectLocationState: (state) => {
            // cache router
            if (state.get('router') !== lastRoute) {
                lastRoute = state.get('router');
                lastRouteJS = lastRoute.toJS();
                return lastRouteJS;
            }
            return lastRouteJS;
        }
    });
    ReactDOM.render(
        <Provider store={store} >
            <Router
                history={history}
                routes={routes} />
        </Provider>,
        document.getElementById('app'));
})();

