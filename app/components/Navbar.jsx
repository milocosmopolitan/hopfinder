import React from 'react';
import { logout } from '../reducers/auth';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import classNames from 'classnames';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class AppBar extends React.Component {
	constructor(props) {
		super(props);
		this.onClickLogout = this.onClickLogout.bind(this)
	}
	onClickLogout(){
    this.props.logout();
    browserHistory.push('/');
  }
	render(){		
		const { user, logout, location } = this.props;		

		const appBarClass = classNames({
  		'collapse': (location.pathname === '/auth')
		});

		return (
			<Navbar id="appbar" className={appBarClass} collapseOnSelect>
		    <Navbar.Header>
		      <Navbar.Brand id="logo">
		        <Link to="/">Hopfinder</Link>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>
		        <NavItem eventKey={1} onClick={() => browserHistory.push("/feed")}>News</NavItem>
		        <NavItem eventKey={2} onClick={() => browserHistory.push("/places")}>Map</NavItem>		        
		      </Nav>
		      { user ? (
		      	<Nav pullRight>
			        <NavItem eventKey={3}>Favorites</NavItem>
			        <NavItem eventKey={4}>{ user && user.name }</NavItem>
			        { user && !user.google_id ? 
	              (
	                <NavItem eventKey={5} onClick={this.onClickLogout}>Logout</NavItem>
	              ) : null 
	            }
			      </Nav>
			  		) : null 
			  	}
		      
		    </Navbar.Collapse>
		  </Navbar>
		)
	}
}

export default connect (
	//state
  ({ auth }) => ({ user: auth }),
  //dispatch
  { logout },
) ( AppBar )