import React from 'react';
import SearchBox from './SearchBox/SearchBox';
import DetailsBox from './DetailsBox/DetailsBox';
import FavoritesBox from './FavoritesBox/FavoritesBox';
import classes from './Shows.module.css';
import {connect} from 'react-redux';
import * as ActionTypes from '../../store/actions/actionTypes';
import * as ActionCreator from '../../store/actions/index';


const Shows = (props) => {


    return (
      <section className={classes.Shows}>
            
            <div>
              <SearchBox 
              title="showsDB v0.5.47 r" 
              />
            </div>
            <div>
              <DetailsBox 
              updateWatched={props.updateWatchedEpisode}  
              updateAllWatchedEpisodes={props.updateAllWatchedEpisodes}/>
            </div>
            <div>
              <FavoritesBox />
            </div>

      </section>
    );
}


const mapDispatchToProps = dispatch => {
  return {
    // updateFavorites: (show) => dispatch({type: ActionTypes.ADD_OR_REMOVE_FAVORITE, newFavorite: show}),
    updateWatchedEpisode: (show, episodeID) =>dispatch({type: ActionTypes.ADD_OR_REMOVE_WATCHED_EPISODE, show: {show: show, episodeID: episodeID}}),
    updateAllWatchedEpisodes: (show, episodesArray, markAllWatched) => dispatch({type:ActionTypes.MARK_ALL_EPISODE_WATCHED, show: {show:show, episodesArray: episodesArray, markAllWatched: markAllWatched}}),
  }
}

export default connect(null,mapDispatchToProps)(Shows);
