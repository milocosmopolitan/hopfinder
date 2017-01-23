'use strict';
import React from 'react';
import { connect } from 'react-redux';
// import {fetchFavorites} from '../reducers/favorites'

const Follow = (props)=>{
	const {favorites} = props
	return (
		<div>
			{ 
				favorites ? 
				favorites.map(favorite=>(
					<div key={favorite.brewery_id}>{favorite.brewery_id}</div>
				)) : null
			}
		</div>
		)
}

const mapState = ({favorites})=>({favorites})
const mapDispatch = ()=>({})

export default connect(mapState, mapDispatch)(Follow)
