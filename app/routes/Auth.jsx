'use strict';
import React from 'react';
import { connect } from 'react-redux';

import Login from '../components/Login'

const Auth = ()=>{
	return (
		<div>
			<Login />
		</div>
		)
}

const mapState = ()=>({})
const mapDispatch = ()=>({})

export default connect(mapState, mapDispatch)(Auth)
