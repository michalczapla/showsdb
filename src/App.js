import React, {Component} from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import SearchBox from './containers/SearchBox/SearchBox';

// HELPERY:
import configuration from './helpers/configuration';

class App extends Component {
  state = {
    currentShow: null,
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
          <SearchBox configuration={this.state.configuration}/>
          <div>SZCZEGOLY</div>
          <div>ULUBIONE</div>
        </Layout>
      </div>
    );
  };
}

export default App;
