import React from 'react';
import classes from '../Timeline.module.css';

const horizontalRule = (props) => {
    

return (
    <React.Fragment>
        <div className={classes.hrDescription}>
            {props.children}
        </div>
        <hr className={classes.timeline}/>
    </React.Fragment>
)

};

export default horizontalRule;