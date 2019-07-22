import React from 'react';
import classes from '../MediaBox.module.css';
import {connect} from 'react-redux';

const MediaSummaryMovie = (props) => {
    
    const imgSrc = (props.data) ?
    <img className={classes.MediaBoxMovieImage} src={`https://img.youtube.com/vi/${props.data.key}/default.jpg`} alt={props.data.name}/>
    : <div className={classes.MediaBoxMovieHeaderImg}></div>;

return (
    <div className={classes.MediaBoxMovieItem} onClick={(props.click) ? ()=>props.click(props.data) : null}>
       {imgSrc}
        <div className={classes.MediaBoxMovieContent}>
            <div className={classes.MediaBoxMovieTitle}>{props.data.type + ' - '+props.data.name}</div>
        </div>
    </div>
);
};


const mapStateToProps = state => {
    return {
    //   configuration: state.main.configuration
    }
  }
  
//   const mapDispatchToProps = dispatch => {
//     return {
//         addEpisodes: (showID, episodes) => dispatch({type: ActionTypes.ADD_EPISODES_TO_SHOW, show: {showID: showID, episodes: episodes}})
//     }
//   }

export default connect(mapStateToProps,null)(MediaSummaryMovie);