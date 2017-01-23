'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Brewery from '../components/Brewery';

const News = (props)=>{
	console.log('News props', props)
	const { favorites, location, params } = props;
	return (
		<Grid id="news-wrapper" fluid={true}>
			<Row>
				<Col 
					xs={12} 
					md={location.pathname === '/places' ? 12 : 6} 
					mdOffset={location.pathname === '/places' ? 0 : 3}>
				{ favorites ? favorites.map(favorite=>(
						<Brewery 
							key={favorite.brewery.breweryId}
							location={location}
							params={params}
							{...favorite.brewery} />
					)) : null
				}
				</Col>
			</Row>
		</Grid>
		);
};

const mapState = ({favorites})=>({favorites});
const mapDispatch = {};

export default connect(mapState, mapDispatch)(News);
