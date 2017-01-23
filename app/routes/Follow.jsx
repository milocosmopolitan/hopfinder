'use strict';
import React from 'react';
import { connect } from 'react-redux';
// import {fetchFavorites} from '../reducers/favorites'

const Follow = (props)=>{
	const {favorites} = props
	console.log(favorites)
	return (
		<div>
			{ 
				favorites ? 
				favorites.map(favorite=>(
					<div key={favorite.brewery_id}>{favorite.brewery.name}</div>
				)) : null
			}
		</div>
		)
}

const mapState = ({favorites})=>({favorites})
const mapDispatch = ()=>({})

export default connect(mapState, mapDispatch)(Follow)
