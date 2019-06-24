import React from 'react';
import classes from './ShowDetailed.module.css';
import {connect} from 'react-redux';
import properDigitNumber from './../../../../../helpers/proper-digit-number';

const showDetailed = (props) => {
    
    const imgSrc = (props.configuration && props.configuration.backdropBase && props.data && props.data.show.backdrop_path) ?
    <img className={classes.BackgroungImg} src={props.configuration.backdropBase+props.data.show.backdrop_path} alt={props.data.show.name}/>
    : null;

return (
    <div className={classes.Episode}>
       {imgSrc}
        <div className={classes.DarkBackground}>
            
            <div className={classes.ShowTitle}>{props.data.show.name}</div>
            <div className={classes.EpisodeTitle}>{props.data.name}</div>
            <div className={classes.EpisodeSignature}>S{properDigitNumber(props.data.season_number)}E{properDigitNumber(props.data.episode_number)}</div>
        </div>
    </div>
);
};


const mapStateToProps = state => {
    return {
      configuration: state.main.configuration
    }
  }
  
//   const mapDispatchToProps = dispatch => {
//     return {
//         addEpisodes: (showID, episodes) => dispatch({type: ActionTypes.ADD_EPISODES_TO_SHOW, show: {showID: showID, episodes: episodes}})
//     }
//   }

export default connect(mapStateToProps)(showDetailed);