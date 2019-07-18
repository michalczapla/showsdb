import React from 'react';
import classes from './TrendBox.module.css';


const TrendBox = (props) => {
    return (
        <div className={classes.TrendBox}>
            <div className={classes.TrendBoxHeader}>
                <img className={classes.TrendBoxHeaderImage} src={props.configuration.backdropBase + props.show.backdrop_path} alt={props.show.original_name} />
                <div className={classes.TrendBoxHeaderTitleShadow}>
                    <div className={classes.TrendBoxHeaderTitleText}>{props.show.original_name}</div>
                </div>
            </div>
            <div className={classes.TrendBoxFooter}>
                <div className={classes.TrendBoxDescription}>{props.show.overview}</div>
                <div className={classes.TrendBoxMetaData}>O czym jest serial</div>
            </div>
        </div>
    );
};

export default TrendBox;