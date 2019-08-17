import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import mainReducer from './store/reducer';
import authReducer from './store/authReducer';
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    main: mainReducer,
    auth: authReducer
});

const composeEnhacers = composeWithDevTools({trace:true, traceLimit:25});
const store = createStore(rootReducer, composeEnhacers(applyMiddleware(thunk)));

const app =(
    <Provider store={store}>
       
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
