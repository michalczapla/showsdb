import * as ActionType from './actionTypes';
import axios from '../../helpers/axios-firebase';
import api_key from './../../helpers/APIKey_firebase';

//asynchorniczne zapytanie - tworzenie nowego użytkownika
export const auth = (email, pass, newUser=true) => {
    return dispatch => {
        dispatch(authStart());
        const payloadAuth = {
            email: email,
            password: pass,
            returnSecureToken: true
        }
        let url = null;
        if (newUser) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+api_key;
        } else {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+api_key;
        }

        axios.post(url,payloadAuth)
        .then(response=> {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        })
        
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
        token: authData.idToken,
        userId: authData.email
    }
}

const authFail = (error) => {
    return {
        type: ActionType.AUTH_FAIL,
        error: error
    }
}