import React, {Component} from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import SearchBox from './containers/SearchBox/SearchBox';
import DetailsBox from './containers/DetailsBox/DetailsBox';
import FavoritesBox from './containers/FavoritesBox/FavoritesBox';


import Favorite from './containers/FavoritesBox/Favorite.class';


// HELPERY:
import configuration from './helpers/configuration';

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

  showSearchHandler= (id) => {
    this.setState({currentShowID: id});
  }

  render() {  
  
    return (
      <div className="App">
        <Layout>
        <div><SearchBox configuration={this.state.configuration} title="showsDB v0.4.11 r" selectShow={this.showSearchHandler}/></div>
        <div><DetailsBox configuration={this.state.configuration} currentShowID={this.state.currentShowID} favorites={this.state.favorites} updateFavorites={this.updateFavorites}/></div>
        <div><FavoritesBox favorites={this.state.favorites} configuration={this.state.configuration} selectShow={this.showSearchHandler}/></div>
         
        </Layout>
      </div>
    );
  };
}

export default App;
