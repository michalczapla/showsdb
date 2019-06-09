import React from 'react';
import classes from '../../Timeline.module.css';
import ShowDetailed from './ShowDetailed/ShowDetailed';
import {formatDateDDMMYYY} from '../../../../helpers/format-date';

const eventDetailed = (props) => {

    
    return (<div className={classes.Event} >
        <div className={classes.EventHeader}>{formatDateDDMMYYY(props.data.date)}</div>
        <div className={[classes.Content, classes.Detailed].join(' ')} >
            {
                props.data.shows.map((el,index)=>{
                return (<ShowDetailed key={el.id+'_'+index} data={el}/>);
            })
            }
            
        </div>
    </div>  
    )  
};

export default eventDetailed;