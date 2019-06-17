import React, {useEffect} from 'react';
import SearchBox from './SearchBox/SearchBox';
import DetailsBox from './DetailsBox/DetailsBox';
import FavoritesBox from './FavoritesBox/FavoritesBox';
import classes from './Shows.module.css';
import {connect} from 'react-redux';
// import * as ActionTypes from '../../store/actions/actionTypes';
import * as ActionCreator from '../../store/actions/index';


const Shows = (props) => {

  useEffect(()=>{
    if (props.configuration  && props.match.params.id && parseInt(props.match.params.id) !== props.currentShowID) {
      props.setCurrentShowID(props.match.params.id);
      // console.log('different id');
      // console.log(props.match.params.id);

    }
  },[props]);

    return (
      <section className={classes.Shows}>
            
            <div>
              <SearchBox title="showsDB v0.5.61 r" />
            </div>
            <div>
              <DetailsBox />
            </div>
            <div>
              <FavoritesBox />
            </div>

      </section>
    );
}

const mapStateToProps = (state)=> {
  return {
    currentShowID: state.currentShowID,
    configuration: state.configuration
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentShowID: (showID) => dispatch(ActionCreator.setCurrentShowID(showID))
    // updateWatchedEpisode: (show, episodeID) =>dispatch({type: ActionTypes.ADD_OR_REMOVE_WATCHED_EPISODE, show: {show: show, episodeID: episodeID}}),
    // updateAllWatchedEpisodes: (show, episodesArray, markAllWatched) => dispatch({type:ActionTypes.MARK_ALL_EPISODE_WATCHED, show: {show:show, episodesArray: episodesArray, markAllWatched: markAllWatched}}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Shows);

