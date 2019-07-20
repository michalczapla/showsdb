import React, {useEffect} from 'react';
import SearchBox from './SearchBox/SearchBox';
import DetailsBox from './DetailsBox/DetailsBox';
import FavoritesBox from './FavoritesBox/FavoritesBox';
import classes from './Shows.module.css';
import {connect} from 'react-redux';
// import * as ActionTypes from '../../store/actions/actionTypes';
import * as ActionCreator from '../../store/actions/index';
import LandingPage from '../../components/LandingPage/LandingPage';


const Shows = (props) => {

  useEffect(()=>{
    if (props.configuration && props.favorites && props.match.params.id && (parseInt(props.match.params.id) !== props.currentShowID)) {
      console.log('different id');
      console.log(props.match.params.id);
      props.setCurrentShowID(props.match.params.id);
    } else if (!props.match.params.id) {
      console.log('clearing');
      // props.setCurrentShow(null);
      // props.setCurrentShowID(null);
      props.clearCurrentShowData();
       
    }
  },[props]);

    return (
      <section className={[classes.Shows, props.favorites.favorites.length===0 ? classes.Shows2columns : null].join(' ')}>
            
            <div>
              <SearchBox title="showsDB v0.7.00 r" />
            </div>
            
            {props.currentShowID ? <div><DetailsBox /></div> : <div><LandingPage /></div> }
            
            {props.favorites.favorites.length===0 ? null : 
            <div className={classes.FavoritesContainer}>
              <FavoritesBox />
            </div>
            }
      </section>
    );
}

const mapStateToProps = (state)=> {
  return {
    currentShowID: state.main.currentShowID,
    configuration: state.main.configuration,
    favorites: state.main.favorites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentShowID: (showID) => dispatch(ActionCreator.setCurrentShowID(showID)),
    setCurrentShow: (show) => dispatch(ActionCreator.fetchCurrentShow(show)),
    clearCurrentShowData: () => dispatch(ActionCreator.clearCurrentShowData())
    // updateWatchedEpisode: (show, episodeID) =>dispatch({type: ActionTypes.ADD_OR_REMOVE_WATCHED_EPISODE, show: {show: show, episodeID: episodeID}}),
    // updateAllWatchedEpisodes: (show, episodesArray, markAllWatched) => dispatch({type:ActionTypes.MARK_ALL_EPISODE_WATCHED, show: {show:show, episodesArray: episodesArray, markAllWatched: markAllWatched}}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Shows);

