import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

const reducer = (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const login = (email, password) =>
  dispatch =>
    axios.post('/api/auth/signin', { email, password })
      .then((res) => { cookie.save('token', res.data.token, {path:'/'}) })
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))      

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/me', { headers: { 'Authorization': cookie.load('token')} })
      .then(res => { dispatch(authenticated(res.data)) })
      .catch(failed => {
        dispatch(authenticated(null))
        browserHistory.push('/auth')
      })

export default reducer