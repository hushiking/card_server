/**
 * Sub Reducers
 */

import I from 'immutable';
import { createReducer } from 'redux/creator';
import { LOGIN_URL } from '../api/config';
export let defaultState = I.fromJS({
    data: {}
});
export default createReducer(I.fromJS(defaultState), {
    [LOGIN_URL](state, action) {
        let body = action.data;
        return state.set('data', I.fromJS(body));
    }
});
