import React, {Component} from 'react';
import SearchBox from './SearchBox/SearchBox';
import DetailsBox from './DetailsBox/DetailsBox';
import FavoritesBox from './FavoritesBox/FavoritesBox';
import classes from './Shows.module.css';
import {connect} from 'react-redux';
import * as ActionTypes from '../../store/actions';

// import {BrowserRouter} from 'react-router-dom';


// import Favorite from './FavoritesBox/Favorite.class';


// HELPERY:
import configuration from '../../helpers/configuration';


class App extends Component {
// state = {
//     currentShowID: null,
//     favorites: null,
//     configuration: null
// }
// favorites = new Favorite();     //objekt "ulubionych"

  // POBRANIE KONFIGURACJI - ŚCIEŻKI DO OBRAZKÓW
  componentDidMount= async() => {
    if (this.props.configuration===null) {
      const conf = await configuration();
      // this.setState({configuration: conf, favorites: this.favorites});
      this.props.setConfiguration(conf);
    }
  }

  
  // updateFavorites=(element) => {
  //   // this.favorites.addOrRemoveFavorite(element);
  //   // this.setState({favorites: this.favorites});

  // }

  // updateWatchedEpisode=(show, episodeID) => {
  //   this.favorites.addOrRemoveWatched(show, episodeID);
  //   this.setState({favorites: this.favorites});
  // }

  // updateAllWatchedEpisodes=(show, episodesArray, markAllWatched) => {
  //   this.favorites.markAll(show,episodesArray,markAllWatched);
  //   this.setState({favorites: this.favorites});
  // }


  // showSearchHandler= (id) => {
  //   this.setState({currentShowID: id});
  // }

  render() {  
  
    return (
      <section className={classes.Shows}>
            
            <div><SearchBox configuration={this.props.configuration} title="showsDB v0.4.43 r" selectShow={this.props.showSearchHandler}/></div>
            <div><DetailsBox configuration={this.props.configuration} currentShowID={this.props.currentShowID} favorites={this.props.favorites} updateFavorites={this.props.updateFavorites} updateWatched={this.props.updateWatchedEpisode}  updateAllWatchedEpisodes={this.props.updateAllWatchedEpisodes}/></div>
            <div><FavoritesBox favorites={this.props.favorites} configuration={this.props.configuration} selectShow={this.props.showSearchHandler}/></div>

      </section>
    );
  };
}

const mapStateToProps = state => {
  return {
    currentShowID: state.currentShowID,
    favorites: state.favorites,
    configuration: state.configuration
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFavorites: (show) => dispatch({type: ActionTypes.ADD_OR_REMOVE_FAVORITE, newFavorite: show}),
    setConfiguration: (configuration) => dispatch({type: ActionTypes.SET_CONFIGURATION, configuration: configuration}),
    updateWatchedEpisode: (show, episodeID) =>dispatch({type: ActionTypes.ADD_OR_REMOVE_WATCHED_EPISODE, show: {show: show, episodeID: episodeID}}),
    updateAllWatchedEpisodes: (show, episodesArray, markAllWatched) => dispatch({type:ActionTypes.MARK_ALL_EPISODE_WATCHED, show: {show:show, episodesArray: episodesArray, markAllWatched: markAllWatched}}),
    showSearchHandler: (id) => dispatch({type: ActionTypes.SET_CURRENT_SHOW_ID, currentShowID:id}) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
