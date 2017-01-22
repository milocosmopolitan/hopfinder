'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col } from  'react-bootstrap'

export default (props) =>{
	const {
		brewery, phone, 
		streetAddress, locality, region, country, 
		latitude, longitude } = props;

	const image = brewery.images && brewery.images.squareMedium ? 
								brewery.images.squareMedium : 
								'http://placehold.it/100x100';

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
						<Link><i className="fa fa-heart-o"></i></Link>
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