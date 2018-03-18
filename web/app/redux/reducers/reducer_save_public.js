/**
 * Sub Reducers example
 */
import I from 'immutable';
import { createReducer } from 'redux/creator';
import { ACTION_SAVE_PUBLIC } from '../actions';

export let defaultState = I.fromJS({
    data: {}
});
export default createReducer(I.fromJS(defaultState), {
    [ACTION_SAVE_PUBLIC](state, action) {
        let {publicData} = action.param;
        return state.set('data', I.fromJS(publicData));
    }
});

