'use strict';

import axios from 'axios';

let key = '	3186203272-x38foBCvgZU4dh5yhu8ER3XZqVA5vFIEu7rfubF';

const INITIALIZE = 'INITIALIZE_BREWERIES';

const init = news => ({ type: INITIALIZE, news })

const NewsReducer = (news=[], action) => {
	switch(action.type) {
		case INITIALIZE:
			return action.news

		default:
			return news
	}
}


export const fetchNearBynews = (lat, lng) => dispatch => {
	console.log('fetchNearByNews')

	if(lat && lng){
		axios.get(`https://api.brewerydb.com/v2/search/geo/point/?key=${key}&lat=${lat}&lng=${lng}&withSocialAccounts=Y`)
			.then(res=>res.data)
	    .then(news=>{
	      dispatch(init(news.data))
	    })
	    .catch(console.error)
  } else {
  	axios.get('https://api.ipify.org/?format=json')		
			.then(res=>axios.get(`https://freegeoip.net/json/?q=${res.data.ip}`))
			.then(res=>axios.get(`https://api.brewerydb.com/v2/search/geo/point/?key=${key}&lat=${res.data.latitude}&lng=${res.data.longitude}&withSocialAccounts=Y`))
			.then(res=>res.data)
	    .then(news=>{
	      dispatch(init(news.data))
	    })
			.catch(console.error)
	}	
}

export default BreweryReducer;