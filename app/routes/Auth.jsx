'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import Login from '../components/Login';
import { whoami } from '../reducers/auth';

class Auth extends React.Component {
	constructor(props) {
		super(props);		
	}
	componentWillReceiveProps(nextProps) {
		console.log('Auth componentWillReceiveProps',nextProps)
		if(nextProps.auth) browserHistory.push('/')
	}
	render(){
		console.log('Auth', this.props)
		return (
			<div>
				<Login /> 
			</div>
		)	
	}
	
}

const mapState = ({auth})=>({auth})
const mapDispatch = { whoami }

export default connect(mapState, mapDispatch)(Auth)
