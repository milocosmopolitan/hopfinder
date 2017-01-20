import React from 'react';
import { login } from 'APP/app/reducers/auth';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';


const Login = ({ login }) => {

  function loginWithCredential(evt){
    evt.preventDefault()
    login(evt.target.email.value, evt.target.password.value)
  }

  function loginWithGoogle(){
    console.log('user clicked to login with google oAuth')

  }

  return (
    <div id="login-wrapper">
      <div>
        <h2>HOPFINDER</h2>
        {/* We will remove login with credential feature after google oauth is established */}
        <form onSubmit={evt => { loginWithCredential(evt)} }>
          <div className="form-group">
            <label>Email</label>
            <input name="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" className="form-control" />
          </div>
          <button className="button" type="submit">Login</button>            
        </form>
      {/* login with google */}
        <button className="button" onClick={loginWithGoogle}>Login with google</button>
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
