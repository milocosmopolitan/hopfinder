import React from 'react'

export const Navbar = ({ user, logout }) => (
  <div id="appbar">  
    <span className="whoami-user-name">{ user && user.name }</span>
    <button className="logout" onClick={ logout }>Logout</button>
  </div>
)

import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export default connect (
	//state
  ({ auth }) => ({ user: auth }),
  //dispatch
  { logout },
) (Navbar)