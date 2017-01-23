import axios from 'axios'

const INITIALIZE = 'INITIALIZE_FAVORITES';
const CREATE     = 'CREATE_FAVORITE';
const REMOVE     = 'REMOVE_FAVORITE';

const init = favorites => ({ type: INITIALIZE, favorites })
const create = favorite => ({ type: CREATE, favorite });
const remove  = id => ({ type: REMOVE, id });


export default (favorites=[], action) => {
	switch(action.type) {
		case INITIALIZE:
			return action.favorites

		case CREATE:
			return [action.favorite, ...favorites];

		case REMOVE:
			return favorites.filter(favorite => favorite.id !== action.id)

		default:
			return favorites;
	}
}

export const fetchFavorites = () => dispatch => {
  axios.get('/api/follow')
       .then(res => dispatch(init(res.data)))
       .catch(err => console.error('Fetching favorites unsuccessful', err));
};

// optimistic
export const removeFavorite = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/follow/${id}`)
       .catch(err => console.error(`Removing favorite: ${id} unsuccessful`, err));
};

export const addFavorite = (favorite, brewery) => dispatch => {	
  axios.post('/api/follow', {
		favorite: favorite,
		brewery: brewery
	})
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating favorite: ${favorite} unsuccessful`, err));
};
