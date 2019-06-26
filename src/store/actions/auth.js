import * as ActionType from './actionTypes';
import axios from '../../helpers/axios-firebase';
// import axios from 'axios';
import api_key from './../../helpers/APIKey_firebase';

//asynchorniczne zapytanie - tworzenie nowego użytkownika lub logowanie na istniejacego
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
            // console.log('[response] :' + response);
            dispatch(authSuccess({...response.data, justCreated: newUser}));   //, ...{justCreated: newUser})
            // console.log({...response.data, justCreated: newUser});
        })
        .catch(err=>{
            // console.log('[error] :' + err);
            dispatch(authFail(err.response.data.error));
        })
        
    }
}

//pobranie danych z local storage - w przypadku wcześniejszego zalogowania
export const getLoginDataFromLocalStorage = () => {
   return dispatch => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('userId');
        console.log(token);
        console.log(user);
        if (token && user) {
            dispatch(authSuccess({idToken:token, email: user}));
        }
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    return {
        type: ActionType.AUTH_LOGOUT
    }
}

const authStart = () => {
    return {
        type: ActionType.AUTH_START
    }
}

const authSuccess = (authData) => {
    
    localStorage.setItem('token',authData.idToken);
    localStorage.setItem('userId',authData.email);
    
    return {
        type: ActionType.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.email,
        justCreated: authData.justCreated
    }
}

const authFail = (error) => {
    return {
        type: ActionType.AUTH_FAIL,
        error: error
    }
}