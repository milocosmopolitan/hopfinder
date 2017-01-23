import axios from 'axios';

const initialState = {	
	city: '',
	country_code: '', 
	country_name: '',
	ip: '',
	latitude : 0,
	longitude: 0,
	region_code : '',
	region_name: '',
	time_zone : '',
	zip_code : ''
};

export default (geolocation=initialState, action) => {
	let newState = Object.assign({}, geolocation);
	switch(action.type){
		case SET_CURRENT_LOCATION:
			newState = action.location;

		case SET_CURRENT_IP:
			newState.ip = action.ip;

		return newState
	}
}
const SET_CURRENT_IP = 'SET_CURRENT_IP';
const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const setCurrentLocation = location => ({
	type: SET_CURRENT_LOCATION,
	location
})
export const setCurrentIP = ip => ({
	type: SET_CURRENT_IP,
	ip
})

export const getCurrentIP = () => dispatch => {
	axios.get('//api.ipify.org/?format=json')		
		.then(res=>axios.get(`//freegeoip.net/json/?q=${res.data.ip}`))
		.then(res=>setCurrentLocation(res.data))
		.catch(console.error)
}

