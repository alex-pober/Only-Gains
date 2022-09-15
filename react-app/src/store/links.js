import _ from 'lodash';

const GET_USER_LINKS = 'session/GET_USER_LINKS'
const CREATE_LINK = 'session/CREATE_LINK'
const UPDATE_LINK = 'session/UPDATE_LINK'
const DELETE_LINK = 'session/DELETE_LINK'

const setAllLinks = (links) => ({
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

export const getUserLinks = (id) => async dispatch => {
  const response = await fetch(`/api/links/${workoutId}`)
  if (response.ok) {
      const data = await response.json();
      if (data.errors) {
          return;
      }
      dispatch(setAllExercises(data));
      return data
  }
}
