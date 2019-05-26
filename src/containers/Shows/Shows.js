import React, {Component} from 'react';
import SearchBox from './SearchBox/SearchBox';
import DetailsBox from './DetailsBox/DetailsBox';
import FavoritesBox from './FavoritesBox/FavoritesBox';
import classes from './Shows.module.css';

// import {BrowserRouter} from 'react-router-dom';


import Favorite from './FavoritesBox/Favorite.class';


// HELPERY:
import configuration from '../../helpers/configuration';


class App extends Component {
state = {
    currentShowID: null,
    favorites: null,
    configuration: null
}
favorites = new Favorite();     //objekt "ulubionych"

  // POBRANIE KONFIGURACJI - ŚCIEŻKI DO OBRAZKÓW
  componentDidMount= async() => {
    if (this.state.configuration===null) {
      const conf = await configuration();
      this.setState({configuration: conf, favorites: this.favorites});
    }
  }

  
  updateFavorites=(element) => {
    this.favorites.addOrRemoveFavorite(element);
    this.setState({favorites: this.favorites});
  }

  updateWatchedEpisode=(show, episodeID) => {
    this.favorites.addOrRemoveWatched(show, episodeID);
    this.setState({favorites: this.favorites});
  }

  updateAllWatchedEpisodes=(show, episodesArray, markAllWatched) => {
    this.favorites.markAll(show,episodesArray,markAllWatched);
    this.setState({favorites: this.favorites});
  }


  showSearchHandler= (id) => {
    this.setState({currentShowID: id});
  }

  render() {  
  
    return (
      <section className={classes.Shows}>

            
            <div><SearchBox configuration={this.state.configuration} title="showsDB v0.4.33 r" selectShow={this.showSearchHandler}/></div>
            <div><DetailsBox configuration={this.state.configuration} currentShowID={this.state.currentShowID} favorites={this.state.favorites} updateFavorites={this.updateFavorites} updateWatched={this.updateWatchedEpisode}  updateAllWatchedEpisodes={this.updateAllWatchedEpisodes}/></div>
            <div><FavoritesBox favorites={this.state.favorites} configuration={this.state.configuration} selectShow={this.showSearchHandler}/></div>

      </section>
    );
  };
}

export default App;
