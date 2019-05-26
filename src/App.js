import React, {Component} from 'react';
import './App.css';
import Shows from './containers/Shows/Shows';
import Timeline from './containers/Timieline/Timeline';
import Layout from './components/Layout/Layout';

import {Switch, BrowserRouter, Route} from 'react-router-dom';

class App extends Component {


  render() {  
  
    return (
      <div className="App">
        <BrowserRouter>
        <Layout>
            <Switch>
              <Route path="/timeline" exact component={Timeline}/> 
              <Route path="/" component={Shows}/> 
            </Switch>
        </Layout>
          </BrowserRouter>
      </div>
    );
  };
}

export default App;
