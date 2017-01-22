import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';

import { App, Home, Auth, News } from '../routes';

/* Reducer */
import { whoami } from '../reducers/auth'
import { fetchNearByBreweries } from '../reducers/brewery'
// import { getCurrentIP } from '../reducers/geolocation'

const Routes = ({ fetchInitialData }) => (	

		<Router history={browserHistory}>
      <Route path="/" component={App} onEnter={fetchInitialData}>
        <IndexRedirect to="/feed" />
        <Route path="/home" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/feed" component={News} />
      </Route>
    </Router>
)


const mapProps = null;

const mapDispatch = dispatch => ({
 fetchInitialData: () => {
    // dispatch(getCurrentIP());
    dispatch(whoami());    
    dispatch(fetchNearByBreweries());
    // what other data might we want to fetch on app load?
  }
});

export default connect(mapProps, mapDispatch)(Routes);
