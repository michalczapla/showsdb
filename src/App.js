import React, {Component} from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import SearchBox from './containers/SearchBox/SearchBox';
import DetailsBox from './containers/DetailsBox/DetailsBox';


// HELPERY:
import configuration from './helpers/configuration';

class App extends Component {
  state = {
    currentShowID: null,
    favorites: [],
    configuration: null
  }

  // POBRANIE KONFIGURACJI - ŚCIEŻKI DO OBRAZKÓW
  componentDidMount= async() => {
    if (this.state.configuration===null) {
      const conf = await configuration();
      this.setState({configuration: conf});

    }
  }

  updateFavorites=(element) => {
    const favoritesIDs = () =>{
      const IDs = [];  
      if (this.state.favorites.length!==0) {
        this.state.favorites.map((el)=>{
          IDs.push(el.id);
        })
        }
      return IDs;
    };

    if (this.state.favorites.length===0) {

    }
  }

  showSearchHandler= (id) => {
    this.setState({currentShowID: id});
  }

  render() {  
    return (
      <div className="App">
        <Layout>
          <div><SearchBox configuration={this.state.configuration} title="showsDB v0.3.01 r" selectShow={this.showSearchHandler}/></div>
          <div><DetailsBox configuration={this.state.configuration} currentShowID={this.state.currentShowID}/></div>
          <div>ULUBIONE</div>
        </Layout>
      </div>
    );
  };
}

export default App;
