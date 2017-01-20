'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Navbar from './components/Navbar'
// import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'


import { Home, Auth, News } from './routes';


/*
 * This will load our own custom stylesheet(sass) file on the project 
 * =============================
 */
require('./stylesheets/style.scss')


/*
 * This is react lib which allows us to use hammer.js
 * =============================
 * https://github.com/JedWatson/react-hammerjs
 */


const Root = ({ user, children }) => {
  
  // if user is not logged in - open auth page 
  // or - open child route component
  return !user ? 
    ( 
      <div><Auth /></div>
    ):
    ( 
      <div>
        <Navbar />
        { children }
      </div> 
    )
}

const App = connect(
  // states
  ({ auth }) => ({ user: auth })
)(Root)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/feed" component={News} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)