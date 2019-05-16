import React from 'react';
import classes from './SeasonsPagination.module.css';
import properDigitNumber from './../../../../helpers/proper-digit-number';

const seasonsPagination = (props) => (
    <div className={classes.SeasonsPagination}>
        {props.seasons.map(el=>{
            const linkName=(el.season_number===0) ? el.name : "S"+properDigitNumber(el.season_number);
            return(<button key={el.id} className={classes.Button} title={el.name} onClick={() => props.activeSeason(el.season_number)}>{linkName}</button>)
        })}
    </div>
);

export default seasonsPagination;