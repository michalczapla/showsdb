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
            const timestamp = new Date(Date.now());
            dispatch(authSuccess({...response.data, justCreated: newUser, timestamp: timestamp}));   //, ...{justCreated: newUser})
            dispatch(checkTokenExpiration(response.data.expiresIn, timestamp));
            // console.log({...response.data, justCreated: newUser});

        })
        .catch(err=>{
            // console.log('[error] :' + err);
            dispatch(authFail(err.response.data.error));
        })
        
    }
}

const checkTokenExpiration = (expirationPeriod, timestamp) => {
    return dispatch => {
        setTimeout(()=>{
            const valid = (new Date(Date.parse(timestamp)+parseInt(expirationPeriod)*1000)>new Date()) ? true : false;
            if (valid) {
                dispatch(authLogout());
                console.log('User logged out due to time out');
            }

        },expirationPeriod*1000+100);
    }
}

const getDataFromCloud = (localId, token) =>{
    return dispatch => {
        axios.get('https://showsdb-787d1.firebaseio.com/'+localId+'.json?auth='+token)
        .then(response=>{
            console.log(response.data);
            dispatch(saveData(response.data))
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

//pobranie danych z local storage - w przypadku wcześniejszego zalogowania i sprawdzenie wygasnięcia tokena
export const getLoginDataFromLocalStorage = () => {
   return dispatch => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('userId');
        const localId = localStorage.getItem('localId');
        const expiresIn = localStorage.getItem('expiresIn');
        const timestamp = localStorage.getItem('timestamp');
        const valid = (new Date(Date.parse(timestamp)+parseInt(expiresIn)*1000)>new Date()) ? true : false;
        // console.log(timestamp);
        // console.log(new Date(Date.parse(timestamp)+parseInt(expiresIn)*1000));
        // console.log(valid);
        if (token && user && localId && valid) {
            dispatch(authSuccess({idToken:token, email: user, localId: localId, expiresIn: expiresIn, timestamp: timestamp}));
        }

    }
}

export const saveData = (favorites) => {
    return {
        type: ActionType.REPLACE_FAVORITES,
        favorites: favorites
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('localId');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('timestamp');

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
    return dispatch => {
    localStorage.setItem('token',authData.idToken);
    localStorage.setItem('userId',authData.email);
    localStorage.setItem('localId',authData.localId);
    localStorage.setItem('expiresIn',authData.expiresIn);
    localStorage.setItem('timestamp',authData.timestamp);


    dispatch(getDataFromCloud(authData.localId, authData.idToken));
    
    dispatch(authSuccessCreator(authData));
    }
}

const authSuccessCreator = (authData) => {
    return {
        type: ActionType.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.email,
        localId: authData.localId,
        expiresIn: authData.expiresIn,
        timestamp: authData.timestamp,
        justCreated: authData.justCreated
    }
}

const authFail = (error) => {
    return {
        type: ActionType.AUTH_FAIL,
        error: error
    }
}