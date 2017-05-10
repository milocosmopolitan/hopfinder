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
	
	let protocol = window.location.protocol === 'http:' ? '' : window.location.protocolcors;
	console.log('fetchNearByBreweries', protocol)
	if(lat && lng){
		console.log(lat, lng)
		axios.get(`//api.brewerydb.com/v2/search/geo/point/?key=${key}&lat=${lat}&lng=${lng}&withSocialAccounts=Y`)
			.then(res=>res.data)
	    .then(breweries=>dispatch(init(breweries.data)))
	    .catch(console.error)

  } else {
  	axios.get(`//api.ipify.org/?format=json`)		
			.then(res=>axios.get(`//freegeoip.net/json/?q=${res.data.ip}`))
			.then(res=>axios.get(`//api.brewerydb.com/v2/search/geo/point/?key=${key}&lat=${res.data.latitude}&lng=${res.data.longitude}&withSocialAccounts=Y`))
			.then(res=>res.data)
	    .then(breweries=>dispatch(init(breweries.data)))
			.catch(console.error)
	}	
}

export default BreweryReducer;