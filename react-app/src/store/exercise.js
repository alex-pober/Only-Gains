import _ from 'lodash';

const GET_USER_EXERCISES = 'session/GET_USER_EXERCISES'
const CREATE_EXERCISE = 'session/CREATE_EXERCISE'
const UPDATE_EXERCISE = 'session/UPDATE_EXERCISE'
const DELETE_EXERCISE = 'session/DELETE_EXERCISE'

const setAllExercises = (exercises) => ({
  type: GET_USER_EXERCISES,
  payload: exercises
})

const setExercise = (exercise) => ({
  type: CREATE_EXERCISE,
  payload: exercise
})

const updateExercise = (exercise) => ({
  type: UPDATE_EXERCISE,
  payload: exercise
})

const deleteExercise = (exercise) => ({
  type: DELETE_EXERCISE,
  payload: exercise
})

const initialState = { exercises: null };

export const getExercises = (workoutId) => async dispatch => {
  const response = await fetch(`/api/exercises/${workoutId}`)
  if (response.ok) {
      const data = await response.json();
      if (data.errors) {
          return;
      }
      dispatch(setAllExercises(data));
      return data
  }
}

export const createExercise = (day_id, title, reps) => async (dispatch) => {
  const response = await fetch('/api/exercises/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          day_id,
          title,
          reps
      })
  })
  if (response.ok) {
      const data = await response.json();
      dispatch(setExercise(data))
      return data
  }
}

export const updateOneExercise = (exercise) => async (dispatch) => {
  const response = await fetch(`/api/exercises/${exercise.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exercise)
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(updateExercise(data))
    return data
  }
}

export const deleteOneExercise = id => async dispatch => {
  const res = await fetch(`/api/exercises/${id}`, {
      method: 'DELETE',
  })
  if (res.ok) {
      dispatch(deleteExercise(id))
      return 'Successfully deleted.'
  }
}

export default function reducer(state = initialState, action){
  switch (action.type){

    case CREATE_EXERCISE:
      return {...state, [action.payload.id]: action.payload}

    case GET_USER_EXERCISES:
      let mapExercises = _.mapKeys(action.payload.exercises, 'id')
      return {...mapExercises}
      // return {...state, ...action.payload.exercises}

    case UPDATE_EXERCISE:
      return {...state, [action.payload.id]: action.payload}

    case DELETE_EXERCISE:
      return _.omit(state, action.payload)

    default:
      return state;
  }
}
