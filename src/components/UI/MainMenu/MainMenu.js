import React , {useState} from 'react';
import classes from './MainMenu.module.css';
import Logo from './../../../assets/images/logo_transparent.png';
import {Link} from 'react-router-dom';
import * as ActionCreator from '../../../store/actions/index';
import { connect } from 'react-redux';

const MainMenu = (props) => {
    
    const [loginButton, setLoginButton] = useState({value: null});
    const [passButton, setPassButton] = useState({value: null});

    return (
    <header className={classes.Menu}>
        <div className={classes.Logo}>
            <img src={Logo} alt="showsdb"/>
        </div>
        <nav >
            <ul>
                <li className={classes.NavigationItem}><Link to="/">Home</Link></li>
                <li className={classes.NavigationItem}><Link to="/timeline">Timeline</Link></li>
                <li>
                   <div className={classes.LoginPanel}>
                        <div className={classes.InputContainer}><input className={classes.Input} type="text" placeholder="Username"/></div> 
                        <div className={classes.InputContainer}><input className={classes.Input}type="password" placeholder="Password"/></div> 
                        <button className={classes.LoginButton}>Log IN</button>
                        <button className={classes.SigninButton}>Sign IN</button>
                    </div>
                </li>
            </ul>
        </nav>
    </header>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (username, pass) => dispatch(ActionCreator.auth(username, pass))
    }
}

export default connect(null, mapDispatchToProps)(MainMenu);