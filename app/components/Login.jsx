import React from 'react';
import { login } from '../reducers/auth';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'

const Login = ({ login }) => {

  function loginWithCredential(evt){
    evt.preventDefault()    
    login(evt.target.email.value, evt.target.password.value)
    browserHistory.push('/')    
  }
  const style = {
    backgroundImage: `url("./favicon-144.png")`
  }
  return (
    <div id="login-wrapper" style={style}>
      <div>
        <h2>HOPFINDER</h2>
        {/* We will remove login with credential feature after google oauth is established */}
        <form onSubmit={evt => { loginWithCredential(evt)} }>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" required className="form-control" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" required className="form-control" />
          </div>
          <button className="button" type="submit">Login</button>            
        </form>
        {/* login with google */}
        <a href="/api/auth/google"><button className="button">Login with Google</button></a>
      </div>
    </div>
  )
}

export default connect (
  //state
  state => ({}),
  //dispatch
  { login },
) ( Login )
