import React from 'react';
import classes from './MetaInfo.module.css';

const metaInfo = (props) => (
    <li><span className={classes.Label}>{props.title}</span> {props.information}</li>
);

export default metaInfo;