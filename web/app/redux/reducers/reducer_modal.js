/**
 * Sub Reducers
 * modalStatus
 */

import I from 'immutable';
import { createReducer } from 'redux/creator';
import { ACTION_MODAL_STATUS } from '../actions';

export let defaultState = I.fromJS({
    data: {}
});
export default createReducer(I.fromJS(defaultState), {
    [ACTION_MODAL_STATUS](state, action) {
        let body = action.param;
        return state.set('data', I.fromJS(body));
    }
});
