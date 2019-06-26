import React , {useState} from 'react';
import classes from './../MainMenu.module.css';
import * as ActionCreator from '../../../../store/actions/index';
import Loader from '../../Loading/Loading';
import { connect } from 'react-redux';
import ContactIcon from 'react-ionicons/lib/MdContact';
import Message from '../../Message/Message';
import {getMessages} from '../../../../helpers/authMessages';


const LoaderPanel = (props) => {

    const [user, setUser] = useState({value: '', required: true, touched:false, valid:false});
    const [pass,setPass] = useState({value: '',required: true, touched:false, valid:false});

    // const signinButtonHandler = () => {
    //     if (user.valid&&pass.valid) {
    //         props.authNewUser(user.value,pass.value);
    //         setUser({value: '', required: true, touched:false, valid:false});
    //         setPass({value: '',required: true, touched:false, valid:false});
    //     }
    // }

    const loginButtonHandler = (newUser=false) => {
        // console.log('user ' + user);
        // console.log('pass ' + pass);
        if (user.valid&&pass.valid) {
            if (newUser) {
                props.authUser(user.value,pass.value, true);
            } else {
                props.authUser(user.value,pass.value, false);
            }
            setUser({value: '', required: true, touched:false, valid:false});
            setPass({value: '',required: true, touched:false, valid:false});
        }
    }

    const userInputHandler = (event) => {
        let isValid = true;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (user.required && event.target.value==='') {
            isValid = false;
            // console.log('Required: true');
        }
        if (event.target.value!=='' && !event.target.value.match(emailRegex)) {   //emailRegex.test(event.target.value)
            isValid= false;
            // console.log('Email: true');
        }
        
        setUser({...user, value: event.target.value, touched: true, valid: isValid});
        // console.log(event.target.value);
    }

    const passInputHandler = (event) => {
        let isValid = true;
         if (pass.required && event.target.value==='') {
            isValid = false;
            // console.log('Required: true');
        }
        // console.log(event.target.value.length);
        if (event.target.value!=='' && event.target.value.length < 6) {  
            isValid= false;
            // console.log('Email: true');
        }
        
        setPass({...pass, value: event.target.value, touched:true, valid:isValid});
        // console.log(event.target.value);
    }

    let pageContent = <Loader small/>;
    if(!props.loading && props.userId) {

        pageContent = (<div className={classes.LoginInfo}>
            <ContactIcon color='white' fontSize='1.8em'/>
            {props.userId}
            <button className={classes.LogoutButton} onClick={props.authLogout}>Logout</button>
            </div>);

    } else if (!props.loading) {
        pageContent = (
            <>
                <div className={classes.InputContainer}><input className={[classes.Input, (!user.valid && user.touched) ? classes.Invalid : null].join(' ')} type="text" placeholder="Username" onChange={userInputHandler}/></div> 
                <div className={classes.InputContainer}><input className={[classes.Input, (!pass.valid && pass.touched) ? classes.Invalid : null].join(' ')} type="password" placeholder="Password" onChange={passInputHandler}/></div> 
                <button className={[classes.LoginButton, ((!user.valid  && user.touched) || (!pass.valid&& pass.touched)) ? classes.ButtonInvalid : null].join(' ')} onClick={()=>loginButtonHandler()}>Log IN</button>
                <button className={[classes.SigninButton, ((!user.valid  && user.touched) || (!pass.valid&& pass.touched)) ? classes.ButtonInvalid : null].join(' ')} onClick={()=>loginButtonHandler(true)}>Sign IN</button>
            </>
        )
    }

    return (
        <div className={classes.LoginPanel}>
            {pageContent}
            {props.error ? <Message message={getMessages(props.error.message)} type='error'/> : null}
            {props.justCreated ? <Message message='User successfully created' type='info'/> : null}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        userId: state.auth.userId,
        error: state.auth.error,
        justCreated: state.auth.justCreated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // authNewUser: (username, pass) => dispatch(ActionCreator.auth(username, pass)),
        authUser: (username, pass, newUser) => dispatch(ActionCreator.auth(username, pass, newUser)),
        authLogout: () => dispatch(ActionCreator.authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderPanel);

