/**
 * Sub Reducers
 * refresh Table
 */

import I from 'immutable';
import { createReducer } from 'redux/creator';
import { ACTION_TABLE_STATUS } from '../actions';

export let defaultState = I.fromJS({
    data: {}
});
export default createReducer(I.fromJS(defaultState), {
    [ACTION_TABLE_STATUS](state, action) {
        let body = action.param;
        return state.set('data', I.fromJS(body));
    }
});
