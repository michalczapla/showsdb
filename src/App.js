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
    configuration: null
  }

  // POBRANIE KONFIGURACJI - ŚCIEŻKI DO OBRAZKÓW
  componentDidMount= async() => {
    if (this.state.configuration===null) {
      const conf = await configuration();
      this.setState({configuration: conf});

    }
  }

  render() {  
    return (
      <div className="App">
        <Layout>
          <div><SearchBox configuration={this.state.configuration} title="showsDB v0.1.12 r"/></div>
          <div><DetailsBox configuration={this.state.configuration} currentShowID={1399}/></div>
          <div>ULUBIONE</div>
        </Layout>
      </div>
    );
  };
}

export default App;
