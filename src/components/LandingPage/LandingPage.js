import React from 'react';
import classes from './LandingPage.module.css';
import VersionHistory from './../../version.info.json';

const landingPage = (props) => (
    <div className={classes.LandingPage}>
        {VersionHistory.todo.map(el=>(<div key={el}>{el}</div>))}
        <hr />
        {VersionHistory.done.map(el=>(<div key={el}>{el}</div>))}
        <hr />
        {VersionHistory.errors.map(el=>(<div key={el}>{el}</div>))}
    </div>
    
);

export default landingPage;