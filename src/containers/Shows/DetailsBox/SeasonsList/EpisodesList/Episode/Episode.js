import React from 'react';
import classes from './Episode.module.css';
import properDigitNumber from '../../../../../../helpers/proper-digit-number';
import noPicture from '../../../../../../assets/images/no_picture.jpg';

import NoResultsIcon from 'react-ionicons/lib/MdRemove';
import WatchedIcon from 'react-ionicons/lib/MdCheckbox';

const episode = (props) => {

    const imageSrc=(props.episode.still_path!==null) ? props.imageBase+props.episode.still_path : noPicture;
    return (
    <div className={classes.Episode}>
        <div className={classes.EpisodeNumber}>S{properDigitNumber(props.episode.season_number)} E{properDigitNumber(props.episode.episode_number)}</div>
        <div className={classes.EpisodeImageContainer}>
            <img className={classes.EpisodeImage} src={imageSrc} alt={props.episode.name} title={props.episode.name} />
            <div className={classes.EpisodeFavorite} onClick={()=>props.updateWatched(props.currentShow,props.episode.id)}>
            {(props.isWatched) ? <WatchedIcon fontSize='2em' color='#009432'/> : <WatchedIcon fontSize='2em'/>}
            </div> 
            
        </div>
        <div className={classes.EpisodeDetailsContainer}>
            <div className={classes.EpisodeTitle}>{(props.episode.name===null) ? <NoResultsIcon fontSize='0.8em' color='#ffffff'/> : props.episode.name}</div>
            <div className={classes.EpisodeMetaContainer}>
                <span className={classes.EpisodeLabel}>air date</span> {(props.episode.air_date===null) ? <NoResultsIcon fontSize='0.8em' color='#ffffff'/> : props.episode.air_date}
            </div>
            <div className={classes.EpisodeDescription}>{props.episode.overview}</div> 
        </div>
    </div>
    );
};

export default episode;