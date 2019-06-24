import React , {useState} from 'react';
import classes from './../MainMenu.module.css';
import * as ActionCreator from '../../../../store/actions/index';
import { connect } from 'react-redux';


const LoaderPanel = (props) => {

    const [loginButton, setLoginButton] = useState({value: null});
    const [passButton, setPassButton] = useState({value: null});
    const [user, setUser] = useState('');
    const [pass,setPass] = useState('');

    const signinButtonHandler = () => {
        console.log('user ' + user);
        console.log('pass ' + pass);
        props.authNewUser(user,pass);
    }

    const userInputHandler = (event) => {
        setUser(event.target.value);
        console.log(event.target.value);
    }

    const passInputHandler = (event) => {
        setPass(event.target.value);
        console.log(event.target.value);
    }


    return (
    <div className={classes.LoginPanel}>
        <div className={classes.InputContainer}><input className={classes.Input} type="text" placeholder="Username" onChange={userInputHandler}/></div> 
        <div className={classes.InputContainer}><input className={classes.Input}type="password" placeholder="Password" onChange={passInputHandler}/></div> 
        <button className={classes.LoginButton}>Log IN</button>
        <button className={classes.SigninButton} onClick={signinButtonHandler}>Sign IN</button>
    </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        authNewUser: (username, pass) => dispatch(ActionCreator.authNewUser(username, pass))
    }
}

export default connect(null, mapDispatchToProps)(LoaderPanel);

