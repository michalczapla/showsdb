import React, {useEffect, useState} from 'react';
import './App.css';
import Shows from './containers/Shows/Shows';
import Timeline from './containers/Timieline/Timeline';
import Layout from './components/Layout/Layout';
import {connect} from 'react-redux';
import * as ActionCreator from './store/actions/index';
import UserAdministration from './containers/UserAdministration/UserAdministration';
import Loader from './/components/UI/Loading/Loading';

import {Switch, BrowserRouter, Route} from 'react-router-dom';

const App = (props) => {
  const [loading, setLoading] = useState(true);


   useEffect(()=>{
    setLoading(true);
      props.setConfiguration();
      props.getLoginDataFromLocalStorage();
    setLoading(false);
  },[props]);
  
  const loggedInRoutes = (props.token) ? (
          <Route path="/user" component={UserAdministration}/> 
   ) : null;

    return (
      (loading) ? <Loader /> :
      <div className="App">
        <BrowserRouter> 
        {/* basename="showsdb-react" */}
        <Layout>
            <Switch>
              <Route path="/timeline" exact component={Timeline}/> 
              {/* <Route path="/login" exact component={Login}/> */}
              {loggedInRoutes}
              <Route path="/:id" exact component={Shows}/> 
              <Route path="/" component={Shows}/> 
            </Switch>
        </Layout>
          </BrowserRouter>
      </div>
    );
}

const mapStateToProps = (state)=> {
  return {
    // configuration: state.main.configuration
    // localId: state.auth.localId,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setConfiguration: () => dispatch(ActionCreator.fetchConfiguration()),
    getLoginDataFromLocalStorage: () => dispatch(ActionCreator.getLoginDataFromLocalStorage())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
