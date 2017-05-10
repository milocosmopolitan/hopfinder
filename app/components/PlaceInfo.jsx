import React from 'react';

export default class ProductInfo extends React.Component {
	constructor(props) {
		super(props);		
	}

	handleFollowClick(){		
		console.log('handleFollowClick', this.props)
	}
	render(){
		const { selectedPlace } = this.props
		return (
			<div>
	      <h4 id="place-name">{selectedPlace.brewery.name}</h4>
	      <h6 id="place-address">{selectedPlace.streetAddress}</h6>
	      <a id="place-website" href={`${selectedPlace.brewery.website}`}>{selectedPlace.brewery.website}</a>

	    </div>
		)	
	}
}
