'use strict';
import React from 'react';
import { connect } from 'react-redux';

const Home = ()=>{
	return (
		<div>
			<p>THIS IS HOME PAGE ROUTE COMPONENT</p>
		</div>
		)
}

const mapState = ()=>({})
const mapDispatch = ()=>({})

export default connect(mapState, mapDispatch)(Home)
