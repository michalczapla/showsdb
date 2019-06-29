import api_key from '../../helpers/APIKey';
import axios from '../../helpers/axios-external';
import * as Mappers from '../../helpers/mappers';
import * as ActionTypes from './actionTypes';

export const setCurrentShowID = (id) => {
    return {
        type: ActionTypes.SET_CURRENT_SHOW_ID,
        id: id
    }
}

const saveCurrentShow = (show) => {
    return {
        type: ActionTypes.SET_CURRENT_SHOW,
        show: show
    }
}

export const fetchCurrentShow = (id) => {
    return async dispatch => {
        if (id!==null) {
            const details_request_url = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`;
            let currentShow = null;
            try {
                const response = await axios(details_request_url);
                currentShow = Mappers.mapShow(response.data);
            } catch {
                currentShow=null;
            }
            dispatch(saveCurrentShow(currentShow));
        } else {
            dispatch(saveCurrentShow(null));
        };
    }
}