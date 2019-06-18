import * as ActionType from './actionTypes';

//asynchorniczne zapytanie
export const auth = (email, pass) => {
    return dispatch => {
        dispatch(authStart());
    }
}


const authStart = () => {
    return {
        type: ActionType.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: ActionType.AUTH_SUCCESS,
        authData: authData
    }
}

const authFail = (error) => {
    return {
        type: ActionType.AUTH_FAIL,
        error: error
    }
}