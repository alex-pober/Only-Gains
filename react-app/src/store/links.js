import _ from 'lodash';

const GET_USER_LINKS = 'session/GET_USER_LINKS'
const CREATE_LINK = 'session/CREATE_LINK'
const UPDATE_LINK = 'session/UPDATE_LINK'
const DELETE_LINK = 'session/DELETE_LINK'

const getLinks = (links) => ({
  type: GET_USER_LINKS,
  payload: links
})

const setLink = (link) => ({
  type: CREATE_LINK,
  payload: link
})

const updateLink = (link) => ({
  type: UPDATE_LINK,
  payload: link
})

const deleteLink = (link) => ({
  type: DELETE_LINK,
  payload: link
})

const initialState = { links: null };

export const getUserLinks = (userId) => async dispatch => {
  const response = await fetch(`/api/links/${userId}`)
  if (response.ok) {
      const data = await response.json();
      if (data.errors) {
          return;
      }
      dispatch(getLinks(data));
      return data
  }
}



export default function reducer(state = initialState, action){
  switch (action.type){

    case GET_USER_LINKS:
      let mapLinks = _.mapKeys(action.payload.exercises, 'id')
      return {...mapLinks}

    case CREATE_LINK:
      return {...state, [action.payload.id]: action.payload}

    case UPDATE_LINK:
      return {...state, [action.payload.id]: action.payload}

    case DELETE_LINK:
      return _.omit(state, action.payload)

    default:
      return state;
  }
}
