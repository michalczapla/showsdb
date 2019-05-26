import React from 'react';
import classes from '../Timeline.module.css';
import ShowSummary from './ShowSummary/ShowSummary';

const event = (props) => {

    const positionClass = props.position==='left'? classes.left : classes.right;

    return (<div className={[classes.Event, positionClass].join(' ')} >
        <div className={classes.Content} >
            <ShowSummary />
            <ShowSummary />
            <ShowSummary />
        </div>
    </div>  
    )  
};

export default event;