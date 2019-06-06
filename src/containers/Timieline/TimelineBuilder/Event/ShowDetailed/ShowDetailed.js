import React from 'react';
import classes from './ShowSummary.module.css';

import DummyPicture from '../../../../assets/images/big_bang.jpg';

const showDetailed = (props) => {
    

return (
    <div className={classes.Event}>
        <img className={classes.HeaderImg} src={DummyPicture} alt="Denim Jeans" />
        <div className={classes.Content}>
            <p className={classes.Title}>Big Bang Theory</p>
            <p className={classes.AdditionalInfo}>250 episodes</p>
        </div>
    </div>
);
};

export default showDetailed;