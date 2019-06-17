import React, {useEffect} from 'react';
import './App.css';
import Shows from './containers/Shows/Shows';
import Timeline from './containers/Timieline/Timeline';
import Layout from './components/Layout/Layout';
import {connect} from 'react-redux';
import * as ActionCreator from './store/actions/index';

import {Switch, BrowserRouter, Route} from 'react-router-dom';

const App = (props) => {

   useEffect(()=>{
    props.setConfiguration();
   },[props]);
    
    return (
      <div className="App">
        <BrowserRouter>
        <Layout>
            <Switch>
              <Route path="/timeline" exact component={Timeline}/> 
              <Route path="/:id" exact component={Shows}/> 
              <Route path="/" component={Shows}/> 
            </Switch>
        </Layout>
          </BrowserRouter>
      </div>
    );
}

const mapDispatchToProps = dispatch => {
  return {
    setConfiguration: () => dispatch(ActionCreator.fetchConfiguration())
  }
}

export default connect(null,mapDispatchToProps)(App);
