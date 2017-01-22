'use strict';
import React from 'react';
import { connect } from 'react-redux';

const News = (props)=>{
	const {breweries} = props;
	return (
		<div>
			{ breweries ? breweries.map(brewery=>(
				<div key={brewery.breweryId}>
					{brewery.brewery.name}
				</div>
			)) : null
			
			}
		</div>
		)
}

const mapState = ({breweries})=>({breweries})
const mapDispatch = ()=>({})

export default connect(mapState, mapDispatch)(News)
