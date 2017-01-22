import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,  
  breweries: require('./brewery').default  
})

export default rootReducer
