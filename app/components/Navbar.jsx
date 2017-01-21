import React from 'react'

export const Navbar = ({ user, logout, location }) => {
	/*
   * Uncomment two lines below and 
   * change the argument of this const to props for 
   * console.log all props that are being passed down
   * ================================================
   */   
	 // console.log('Navabar PROPS: ', props)
	 // const { user, logout, location } = props

	// We will change the look of navbar according to location pathname
	console.log('Navbar gets location from main.jsx', location)
	return (
  <div id="appbar">  
    <span className="whoami-user-name">{ user && user.name }</span>    
  </div>
	)
}

// import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export default connect (
	//state
  ({ auth }) => ({ user: auth }),
  //dispatch
  {  },
) (Navbar)