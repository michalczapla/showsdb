import * as ActionType from './actionTypes';

export const setCurrentShowID = (id) => {
    return {
        type: ActionType.SET_CURRENT_SHOW_ID,
        id: id
    }
}