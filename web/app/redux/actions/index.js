/**
 * Action Types
 */

import { createAction } from '../creator';
// modal状态
export const ACTION_MODAL_STATUS = 'ACTION_MODAL_STATUS';

// 更新表格数据的
export const ACTION_TABLE_STATUS = 'ACTION_TABLE_STATUS';
// 存取公共数据
export const ACTION_SAVE_PUBLIC = 'ACTION_SAVE_PUBLIC';

/**
 * Action Creators
 */

// This is an example. Add your action creators below.
export const modalStatusAction = param => {
    return {
        type: ACTION_MODAL_STATUS,
        param
    };
};
// This is an example. Add your action creators below.
export const refrehTableAction = param => {
    return {
        type: ACTION_TABLE_STATUS,
        param
    };
};
// This is an example. Add your action save data.
export const savePublicAction = param => {
    return {
        type: ACTION_SAVE_PUBLIC,
        param
    };
};

// This is an example. Add your action creators below.
// export const modalStatusAction = createAction(ACTION_MODAL_STATUS, 'result');
// This is an example. Add your action creators below.