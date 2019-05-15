import React from 'react';
import classes from './Loading.module.css';


const loading = (props) => (
    <div className={classes.LoaderContainer}>
        <div className={classes.Loading}></div>
    </div>
      
);

export default loading;