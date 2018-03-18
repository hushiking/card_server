/**
 * Root Reducer
 */
import I from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

// import your reducers below
// import reducerExample from './reducer_example';
import reducerModal from './reducer_modal';
import reducerLogin from './reducer_login';
import reducerRefreshTable from './reducer_refresh_table';
import reducerSavePublic from './reducer_save_public';

let initialState = I.fromJS({
    locationBeforeTransitions: undefined
});

let router = (state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }
    return state;
};
const rootReducer = combineReducers({
    router,
    reducerModal,
    reducerLogin,
    reducerRefreshTable,
    reducerSavePublic
});

export default rootReducer;

