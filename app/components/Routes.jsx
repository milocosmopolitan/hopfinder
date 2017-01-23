import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';


import { App, Home, Auth, News, Places, Follow } from '../routes';

/* Reducers */
import { whoami } from '../reducers/auth'
import { fetchNearByBreweries } from '../reducers/brewery'
import { fetchFavorites } from '../reducers/favorites'


const Routes = ({ fetchInitialData }) => (	

	<Router history={browserHistory}>
      <Route path="/" component={App} onEnter={fetchInitialData}>
        <IndexRedirect to="/feed" />        
        <Route path="/auth" component={Auth} />
        <Route path="/feed" component={News} />        
        <Route path="/places" component={Places} />
        <Route path="/follow" component={Follow} />
      </Route>
    </Router>
)


const mapProps = null;

const mapDispatch = dispatch => ({
 fetchInitialData: () => {    
    dispatch(whoami());    
    dispatch(fetchNearByBreweries());
    dispatch(fetchFavorites());
    // what other data might we want to fetch on app load?
  }
});

export default connect(mapProps, mapDispatch)(Routes);
