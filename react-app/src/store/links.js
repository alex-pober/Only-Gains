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

export const createLink = (user_id, title, link) => async (dispatch) => {
  const response = await fetch(`/api/links/` , {
    method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user_id,
          title,
          link
      })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(setLink(data))
    return data
  }
}

export const updateOneLink = (id, title, link) => async (dispatch) => {
  const response = await fetch(`/api/links/${id}` , {
    method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          id,
          title,
          link
      })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(updateLink(data))
    return data
  }
}

export const deleteOneLink = id => async dispatch => {
  const res = await fetch(`/api/exercises/${id}`, {
      method: 'DELETE',
  })
  if (res.ok) {
      dispatch(deleteLink(id))
      return 'Successfully deleted.'
  }
}

export default function reducer(state = initialState, action){
  switch (action.type){

    case GET_USER_LINKS:
      let mapLinks = _.mapKeys(action.payload.links, 'id')
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
