import React, {Component} from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import SearchBox from './containers/SearchBox/SearchBox';

// HELPERY:
import axios from './helpers/axios-external';
import api_key from './helpers/APIKey';
import configuration from './helpers/configuration';

class App extends Component {
  state = {
    searchResults: null,
    actualPage:null,
    totalPages:null,
    totalResults: 0,
    totalLoadedResults: 0,
    configuration: null
  }

  // POBRANIE KONFIGURACJI - ŚCIEŻKO DO OBRAZKÓW
  componentDidMount= async() => {
    if (this.state.configuration===null) {
      const conf = await configuration();
      this.setState({configuration: conf});

    }
  }

  searchInputHandler = async (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      const value = event.target.value.trim();
        if (value!=='') {
          const search_request_url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${value}&page=${1}`;
          
          const response = await axios(search_request_url);
          
          this.setState({searchResults: response.data.results, actualPage: response.data.page, totalPages: response.data.total_pages, totalResults: response.data.total_results, totalLoadedResults: response.data.results.length});
        }
    }
  };

  render() {  
    return (
      <div className="App">
        <Layout>
          <SearchBox enterHandler={this.searchInputHandler} results={this.state.searchResults} configuration={this.state.configuration}/>
          <div>SZCZEGOLY</div>
          <div>ULUBIONE</div>
        </Layout>
      </div>
    );
  };
}

export default App;
