import * as ActionTypes from './actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    localId: null,
    error: null,
    loading: false,
    justCreated: false,
    changePass: {loading: false, message: null, messageType:null, successfullyChanged: false, initial: true}
}

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true,
        justCreated: false
    };
}

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        localId: action.localId,
        expiresIn: action.expiresIn,
        timestamp: action.timestamp,
        error: null,
        loading: false,
        justCreated: action.justCreated
    }
}

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
}

const authLogout = (state, action) => {
    return {
        ...state,
        error: null,
        token: null,
        userId: null,
        localId: null,
        loading: false
    }
}

const changePassStart = (state, action) => {
    return {
        ...state,
        changePass: {loading: true,  message: null, messageType:null, successfullyChanged: false, initial: false}
    }
}
const changePassSuccess = (state, action) => {
    return {
        ...state,
        changePass: {loading: false,  message: action.message, messageType:action.messageType, successfullyChanged: true, initial: false}
    }
}
const changePassFail = (state, action) => {
    return {
        ...state,
        changePass: {loading: false, message: action.message, messageType:action.messageType, successfullyChanged: false, initial: false}
    }
}

const clearChangePass = (state, action) => {
    return {
        ...state,
        changePass: {loading: false, message: null, messageType:null, successfullyChanged: false, initial: true}
    }
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_START: return authStart(state, action);
        case ActionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case ActionTypes.AUTH_FAIL: return authFail(state, action);
        case ActionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case ActionTypes.AUTH_CHANGE_PASS_START: return changePassStart(state, action);
        case ActionTypes.AUTH_CHANGE_PASS_SUCCESS: return changePassSuccess(state, action);
        case ActionTypes.AUTH_CHANGE_PASS_FAIL: return changePassFail(state, action);
        case ActionTypes.AUTH_CHANGE_PASS_CLEAR: return clearChangePass(state, action);
        default:
            return state;
    }
}

export default reducer;