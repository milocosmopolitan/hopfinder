'use strict';
import React from 'react';
import { connect } from 'react-redux';

const News = ()=>{
	return (
		<div>
			<p>THIS IS NEWS PAGE ROUTE COMPONENT</p>
		</div>
		)
}

const mapState = ()=>({})
const mapDispatch = ()=>({})

export default connect(mapState, mapDispatch)(News)
