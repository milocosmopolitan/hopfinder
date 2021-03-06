'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Brewery from '../components/Brewery';
import {removeFavorite, addFavorite} from '../reducers/favorites';

const Breweries = (props)=>{

	console.log('Breweries props', props)
	const { breweries, location, params, auth } = props;

	return (
		<Grid id="breweries-wrapper" fluid={true}>
			<Row>
				<Col 
					xs={12} 
					md={location.pathname === '/places' ? 12 : 6} 
					mdOffset={location.pathname === '/places' ? 0 : 3}>
				{ breweries ? breweries.map(brewery=>(
						<Brewery 

							key={brewery.breweryId}
							location={location}
							params={params}
							auth={auth}
							addFavorite={addFavorite}
							removeFavorite={removeFavorite}
							{...brewery} />
					)) : null
				}
				</Col>
			</Row>
		</Grid>
		)
}

const mapState = ({breweries, auth})=>({breweries, auth})
const mapDispatch = {removeFavorite, addFavorite}

export default connect(mapState, mapDispatch)(Breweries)
