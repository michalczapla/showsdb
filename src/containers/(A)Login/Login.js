import React, {useState} from 'react';
import classes from './Login.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

const Login = (props) => {
    
    const [loginMode, isLoginMode] = useState(true);

    return (
        <React.Fragment>
        <Backdrop show={props.show} clicked={props.toggleModal}></Backdrop>
        <div className={classes.Login} style={{
             transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',        //zmiana pozycji, aby modal nie zasłaniał komponentów na stronie, nawet jeżeli nie jest wyświetklany
            opacity: props.show ? '1' : '0'}}>
            <div className={classes.Title}>{(loginMode) ? 'Log in' : 'Sign in'}</div>
            <div className={classes.Message}>{(loginMode) ? 'Please log in' : 'Please sign in'}</div>
        </div>
    </React.Fragment>

    )
};

export default Login;