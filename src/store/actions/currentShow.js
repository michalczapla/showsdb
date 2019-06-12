import * as ActionTypes from './actionTypes';

export const setCurrentShowID = (id) => {
    return {
        type: ActionTypes.SET_CURRENT_SHOW_ID,
        id: id
    }
}