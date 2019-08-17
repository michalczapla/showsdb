import React, {useState} from 'react';
import classes from './UserAdministration.module.css';
import {connect} from 'react-redux';

const UserAdministration = (props) => {
    
   
    return (
    <div className={classes.UserAdministration}>
        <div className={classes.Panel}>
        <div className={classes.Header}>Login info</div>
            <div>You are logged in as: <strong>{props.userId}</strong></div>
        </div>
        <div className={classes.Panel}>
            <div className={classes.Header}>Password change</div>
            <div>Enter your old password:</div>
            <div>Enter your new password:</div>
            <div>Confirm your new password:</div>
        </div>


    </div>

    )
};

const mapStateToProps = (state)=> {
    return {
        userId: state.auth.userId,
    }
}

export default connect(mapStateToProps)(UserAdministration);