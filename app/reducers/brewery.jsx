'use strict';

import axios from 'axios';

let key = 'a310508345ffb00159fb3899dfa87d41';

const INITIALIZE = 'INITIALIZE_BREWERIES';

const init = breweries => ({ type: INITIALIZE, breweries })

const BreweryReducer = (breweries=[], action) => {
	switch(action.type) {
		case INITIALIZE:
			return action.breweries

		default:
			return breweries
	}
}


export const fetchNearByBreweries = (lat, lng) => dispatch => {
	var options = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
		};

		function success(pos) {
		  var crd = pos.coords;

		  console.log('Your current position is:');
		  console.log(`Latitude : ${crd.latitude}`);
		  console.log(`Longitude: ${crd.longitude}`);
		  console.log(`More or less ${crd.accuracy} meters.`);
		};

		function error(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
		
	axios.get(`//api.brewerydb.com/v2/search/geo/point/?key=${key}&lat=${40.778187}&lng=${-73.900679}`)
		.then(res=>res.data)
    .then(breweries=>{
      dispatch(init(breweries.data))
    })
}


// export const fetchBreweries = () => dispatch => {
// 	axios.get(`//api.brewerydb.com/v2/breweries/?key=${key}`)
// 		.then(res=>res.data)
//     .then(breweries=>{
//       dispatch(init(breweries.data))
//     })
// }

export default BreweryReducer;