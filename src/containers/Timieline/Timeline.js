import React, {Component} from 'react';
import Event from './Event/Event';
import HorizontalRule from './HorizontalRule/HorizontalRule';
import classes from './Timeline.module.css';

class Timeline extends Component {
state={
}

    render() {
        return (
            <section className={classes.TimelineContainer}>
            <div className={classes.Timeline}>
                <Event position='left'/>
                <HorizontalRule>Older than month</HorizontalRule>
                <Event position='right'/>
                <Event position='left'/>
                <HorizontalRule>After next month</HorizontalRule>
                <Event position='right'/>
            </div>
            </section>
        );
    };
};

export default Timeline;