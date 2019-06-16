import React from 'react';
import classes from '../../Timeline.module.css';
import ShowSummary from './ShowSummary/ShowSummary';

const event = (props) => {

    // const positionClass = props.position==='left'? classes.left : classes.right;

    
    return (<div className={classes.Event} >
        <div className={classes.Content} >
            {
                props.data.map((el,index)=>{
                return (<ShowSummary key={el.id+'_'+index} data={el} info={'Episodes: ' + el.episodes.length}/>);
            })
            }
            
        </div>
    </div>  
    )  
};

export default event;