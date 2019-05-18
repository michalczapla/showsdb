import React from 'react';
import classes from './Modal.module.css';
import Backdrop from './../Backdrop/Backdrop';

const modal = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} clicked={props.toggleModal}></Backdrop>
        <div className={classes.Modal} style={{
             transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',        //zmiana pozycji, aby modal nie zasłaniał komponentów na stronie, nawet jeżeli nie jest wyświetklany
            opacity: props.show ? '1' : '0'}}>
            <div className={classes.Title}>{props.title}</div>
            <div className={classes.Message}>{props.children}</div>
        </div>
    </React.Fragment>

);

export default modal;