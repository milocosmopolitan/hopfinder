import React from 'react'
import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		
		const { user, logout, location } = this.props;		
		return (
		  <div id="appbar">  
		  	{ user ? (
		  		<div>
		  			<span className="whoami-user-name">{ user && user.name }</span>
            { user && user.password ? 
              (
                <button className="logout" onClick={ logout }>Logout</button>
              ) : null 
            }
		  			
	  			</div>
		  		) : null 
		  	}
		  </div>
		)
	}
}

export default connect (
	//state
  ({ auth }) => ({ user: auth }),
  //dispatch
  { logout },
) ( Navbar )