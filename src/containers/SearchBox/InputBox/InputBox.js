import React from 'react';
import classes from './InputBox.module.css';

const inputbox = (props) => (
    <div className={classes.SearchBox}>
                    <div className={classes.Title}>{props.title}</div>
                    <input className={classes.InputBox} type="text" placeholder={props.placeholder} onKeyDown={props.enterHandler}/>
    </div>
);

export default inputbox;