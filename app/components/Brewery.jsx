'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col } from  'react-bootstrap'

import store from '../store';
export default (props) =>{
	const {
		auth, 
		brewery, phone, 
		streetAddress, locality, region, country, 
		latitude, longitude,
		addFavorite, removeFavorite } = props;

	const image = brewery.images && brewery.images.squareMedium ? 
								brewery.images.squareMedium : 
								'http://placehold.it/100x100';

	const addToFavorites=(e)=>{    
    let data = {
    	favorite: {
    		brewdb_id: brewery.id,
      	user_id: auth.id	
    	},
    	brewery: {
    		brewery: brewery,
    		phone: phone, 
				streetAddress:streetAddress, 
				locality: locality, 
				region:region, 
				country:country, 
				latitude:latitude, 
				longitude:longitude
    	}
    }    
    
    // console.log('addToFavorites', data.favorite, data.brewery)
    // console.log(addFavorite)
    store.dispatch(addFavorite(data.favorite, data.brewery))
  }

	return (
		<Grid className="brewery-wrapper" fluid={true}>
			<Row>				
				<Col xs={9}>
					<div>{brewery.name}</div>
					<div>{brewery.website}</div>
					<div>{brewery.locationTypeDisplay}</div>
					<div>{streetAddress}</div>
					<div>{`${locality}, ${region} ,${country.displayName}`}</div>
					<div>{phone}</div>
					<div>{`${latitude}, ${longitude}`}</div>
				</Col>
				<Col xs={3}>
					<div className="brewery-image" 
							style={{backgroundImage:`url("${image}")`}}/>
				</Col>
				<Col xs={12}>
					<div className="brewery-actions">
						<Link onClick={(e)=>addToFavorites(e)}><i className="fa fa-heart-o"></i></Link>
						<Link><i className="fa fa-plus">Detail</i></Link>
					</div>
					<div className="brewery-social-links">
						<Link><i className="fa fa-globe"></i></Link>
						<Link><i className="fa fa-facebook"></i></Link>
						<Link><i className="fa fa-twitter"></i></Link>
						<Link><i className="fa fa-instagram"></i></Link>
					</div>
				</Col>
			</Row>
		</Grid>
		)
}