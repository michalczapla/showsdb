import React from 'react';
import classes from '../../Timeline.module.css';
import ShowDetailed from './ShowDetailed/ShowDetailed';
import {formatDateDDMMYYY} from '../../../../helpers/format-date';

const eventDetailed = (props) => {

    const positionClass = props.position==='left'? classes.left : classes.right;

    
    
    return (<div className={[classes.Event, positionClass].join(' ')} >
        <div className={classes.EventHeader}>{formatDateDDMMYYY(props.data.date)}</div>
        <div className={classes.Content} >
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