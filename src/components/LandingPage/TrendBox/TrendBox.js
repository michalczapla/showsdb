import React from 'react';
import classes from './TrendBox.module.css';
import GenreMapper from '../../../helpers/genre-mapper';


const TrendBox = (props) => {
    return (
        <div className={classes.TrendBox} onClick={()=>props.clicked(props.show.id)}>
            <div className={classes.TrendBoxHeader}>
                <img className={classes.TrendBoxHeaderImage} src={props.configuration.backdropBase + props.show.backdrop_path} alt={props.show.original_name} />
                <div className={classes.TrendBoxHeaderTitleShadow}>
                    <div className={classes.TrendBoxHeaderTitleText}>{props.show.original_name}</div>
                    <div className={classes.TrendBoxHeaderTitleRateShadow}>
                        <div className={classes.TrendBoxHeaderTitleRate}>{props.show.vote_average}</div>
                    </div>
                </div>
            </div>
            <div className={classes.TrendBoxFooter}>
                <div className={classes.TrendBoxDescription}>{props.show.overview}</div>
                <div className={classes.TrendBoxMetaData}>{GenreMapper(props.configuration.genreList,props.show.genre_ids)}</div>
            </div>
        </div>
    );
};

export default TrendBox;