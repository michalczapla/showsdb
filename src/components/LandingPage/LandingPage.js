import React from 'react';
import classes from './LandingPage.module.css';
import VersionHistory from './../../version.info.json';

const landingPage = (props) => (
    <div className={classes.LandingPage}>
        <ul>{VersionHistory.todo.map((el,index)=>(<li key={el+'_'+index}>{el}</li>))}</ul>
        <hr />
        <ul>{VersionHistory.done.map((el,index)=>(<li key={el+'_'+index}>{el}</li>))}</ul>
        <hr />
        <ul>{VersionHistory.errors.map((el,index)=>(<li key={el+'_'+index}>{el}</li>))}</ul>
    </div>
    
);

export default landingPage;