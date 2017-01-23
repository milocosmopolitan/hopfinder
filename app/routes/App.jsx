import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Navbar from '../components/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);    
  }
  // componentWillMount() {
  //   this.props.whoami();
  // }
  componentWillReceiveProps(nextProps) {    
    console.log('Root componentWillReceiveProps', nextProps)    
    if(!nextProps.user && this.props.location.pathname !== "/auth")
      browserHistory.push('/auth')    
  }
  render(){
    const { children, location, user } = this.props
    return ( 
      <div>
        <Navbar location={location} />
        { children }
      </div> 
    )
  }
}

export default connect(
  // states
  ({ auth }) => ({ user: auth })  
)(App)