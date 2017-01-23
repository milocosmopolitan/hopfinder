import React from 'react'
import { logout } from '../reducers/auth'
import { connect } from 'react-redux'
import classNames from 'classnames';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		
		const { user, logout, location } = this.props;		

		const appBarClass = classNames({
  		'collapse': (location.pathname === '/auth')
		});

		return (
		  <div id="appbar" className={appBarClass}>  
		  	<div id="logo">Logo</div>
		  	<div className="left">
		  		<ul>
		  			<li>News</li>
		  			<li>Places</li>
		  		</ul>
		  	</div>		  	
		  	<div className="right">
		  		<ul>		  			
		  			<li>My Account</li>
		  		</ul>
		  	</div>
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
		  	<div className="clear"></div>
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