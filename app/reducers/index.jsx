import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,  
  breweries: require('./brewery').default, 
  favorites: require('./favorites').default
})

export default rootReducer
