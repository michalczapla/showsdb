import React from 'react';
import classes from './ShowSummary.module.css';
import {connect} from 'react-redux';

const showSummary = (props) => {
    
    const imgSrc = (props.configuration && props.configuration.imagesBase && props.data && props.data.backdrop_path) ?
    <img className={classes.HeaderImg} src={props.configuration.imagesBase+props.data.poster_path} alt={props.data.name}/>
    : null;

return (
    <div className={classes.Event}>
       {imgSrc}
        <div className={classes.Content}>
            <div className={classes.Title}>{props.data.name}</div>
            <div className={classes.AdditionalInfo}>Episodes: {props.data.episodes.length}</div>
        </div>
    </div>
);
};


const mapStateToProps = state => {
    return {
      configuration: state.configuration
    }
  }
  
//   const mapDispatchToProps = dispatch => {
//     return {
//         addEpisodes: (showID, episodes) => dispatch({type: ActionTypes.ADD_EPISODES_TO_SHOW, show: {showID: showID, episodes: episodes}})
//     }
//   }

export default connect(mapStateToProps,null)(showSummary);