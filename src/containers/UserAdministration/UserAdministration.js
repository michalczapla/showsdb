import React, {useState} from 'react';
import classes from './UserAdministration.module.css';
import {connect} from 'react-redux';
import * as ActionCreator from '../../store/actions/index';
import Message from '../../components/UI/Message/Message';
import {getMessages} from '../../helpers/authMessages';
import Loader from '../../components/UI/Loading/Loading';

const UserAdministration = (props) => {
   
    const [pass,setPass] = useState({
        oldPass: {value: '',required: true, touched:false, valid:false},
        newPass: {value: '',required: true, touched:false, valid:false},
        confirmPass: {value: '',required: true, touched:false, valid:false},
    });

    const passInputHandler = (event) => {
        const passType = event.target.id;
        let isValid = true;
         if (pass[passType].required && event.target.value==='') {
            isValid = false;
            // console.log('Required: true');
        }
        // console.log(event.target.value.length);
        if (event.target.value!=='' && event.target.value.length < 6) {  
            isValid= false;
            // console.log('Email: true');
        }
        
        setPass({...pass, [passType] :{value: event.target.value, touched:true, valid:isValid}});
        // console.log(pass);
    }



    const changePasswordHandler = () => {
        if (pass.newPass.valid  && pass.oldPass.valid && pass.confirmPass.valid && pass.confirmPass.value===pass.newPass.value) {
            props.changePass(props.userId,pass.oldPass.value,pass.newPass.value);

            setPass({oldPass: {value: '',required: true, touched:false, valid:false},
            newPass: {value: '',required: true, touched:false, valid:false},
            confirmPass: {value: '',required: true, touched:false, valid:false}});
        }
    }
   
    return (
    <div className={classes.UserAdministration}>
        <div className={classes.Panel}>
        <div className={classes.Header}>Login info</div>
            <div>You are logged in as: <strong>{props.userId}</strong></div>
        </div>
        <div className={classes.Panel}>
            <div className={classes.Header}>Password change</div>
            <div>Enter your old password:</div>
            <div className={classes.InputContainer}>
                <input className={[classes.Input, (!pass.oldPass.valid && pass.oldPass.touched) ? classes.Invalid : null].join(' ')} type="password" placeholder="Old password" id="oldPass" onChange={passInputHandler} value={pass.oldPass.value}/>
            </div> 
            <div>Enter your new password:</div>
            <div className={classes.InputContainer}>
                <input className={[classes.Input, (!pass.newPass.valid && pass.newPass.touched) ? classes.Invalid : null].join(' ')} type="password" placeholder="New password" id="newPass" onChange={passInputHandler} value={pass.newPass.value}/>
            </div> 
            <div>Confirm your new password:</div>
            <div className={classes.InputContainer}>
                <input className={[classes.Input, (!pass.confirmPass.valid && pass.confirmPass.touched) ? classes.Invalid : null].join(' ')} type="password" placeholder="Confirm new password" id="confirmPass" onChange={passInputHandler} value={pass.confirmPass.value}/>
                {(pass.confirmPass.touched && pass.newPass.touched && pass.confirmPass.valid && pass.newPass.valid && pass.confirmPass.value!==pass.newPass.value)? (<i><small>Does not match</small></i>) : null}
            </div> 

            {(props.changePassState.loading) ? <Loader /> : <button className={[classes.ChangePassButton, (!(pass.newPass.valid  && pass.oldPass.valid && pass.confirmPass.valid && pass.confirmPass.value===pass.newPass.value)) ? classes.ButtonInvalid : null].join(' ')} onClick={()=>changePasswordHandler()}>Change password</button>}
        </div>
        {props.changePassState.error ? <Message message={getMessages(props.changePassState.error.message)} type='error'/> : null}

    </div>

    )
};

const mapStateToProps = (state)=> {
    return {
        userId: state.auth.userId,
        changePassState: state.auth.changePass
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        changePass: (email, oldPass,newPass) => dispatch(ActionCreator.changePassword(email,oldPass,newPass))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdministration);