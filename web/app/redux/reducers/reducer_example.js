/**
 * Sub Reducers example
 */
import I from 'immutable';
import { createReducer } from 'redux/creator';
import { EXAMPLE_URL } from '../actions';

export let defaultState = I.fromJS({
    data: {}
});
export default createReducer(I.fromJS(defaultState), {
    [EXAMPLE_URL](state, action) {
        let {body} = action.result;
        return state.set('data', I.fromJS(body));
    }
});

