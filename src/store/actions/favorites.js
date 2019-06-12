import * as ActionTypes from './actionTypes';

export const updateFavorites = (show) => {
    return {
        type: ActionTypes.ADD_OR_REMOVE_FAVORITE,
        newFavorite: show
    }
}