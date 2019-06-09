import React from 'react';
import Event from './Event/Event';
import EventDetailed from './Event/EventDetailed';
import HorizontalRule from './HorizontalRule/HorizontalRule';


const timelineBuilder = (props) => {

    const olderThan30days = () => {
        if (props.shows && props.shows.olderThan30Days && props.shows.olderThan30Days.length!==0 ) {
            return (
                <>
                    <Event position='left' data={props.shows.olderThan30Days}/>
                    <HorizontalRule>Older than month</HorizontalRule>
                </>
            )
        }
    };
    
    const next30days = () => {
        if (props.shows && props.shows.next30days && props.shows.next30days.length!==0) {
            return (
                <>
                    <HorizontalRule>After next month</HorizontalRule>
                    <Event position='left' data={props.shows.next30days}/>
                </>
            )
        }
    };

    const within30days = () => {
        if (props.shows && props.shows.within30days && props.shows.within30days.length!==0) {
            const arrayOfEvents = props.shows.within30days;
            arrayOfEvents.sort((a,b)=>{
                a=new Date(a.date);
                b=new Date(b.date);
                return a<b ? -1 : a>b ? 1 : 0;
            })
            
            return arrayOfEvents.map((el,index)=>{
                return (
                    <EventDetailed key={'detailed_'+index} position='left' data={el}/>
                )
            })
           
        }
    };


    return(  
        <>
            {olderThan30days()}
            {within30days()}
            {next30days()}
        </>
    )

};
    


export default timelineBuilder;