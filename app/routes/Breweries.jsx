'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Brewery from '../components/Brewery';

const Breweries = (props)=>{
	console.log('News PROPS', props)
	const { breweries } = props;
	return (
		<Grid id="breweries-wrapper" fluid={true}>
			<Row>
				<Col xs={12} md={6} mdOffset={3}>
				{ breweries ? breweries.map(brewery=>(
						<Brewery 
							key={brewery.breweryId} 							 
							{...brewery} />
					)) : null
				}
				</Col>
			</Row>
		</Grid>
		)
}

const mapState = ({breweries})=>({breweries})
const mapDispatch = ()=>({})

export default connect(mapState, mapDispatch)(Breweries)
