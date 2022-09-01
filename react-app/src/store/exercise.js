const GET_USER_EXERCISES = 'session/GET_USER_EXERCISES'
const CREATE_EXERCISE = 'session/CREATE_EXERCISE'

const setAllExercises = (exercises) => ({
  type: GET_USER_EXERCISES,
  payload: exercises
})

const setExercise = (exercise) => ({
  type: CREATE_EXERCISE,
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

export default function reducer(state = initialState, action){
  switch (action.type){
    case CREATE_EXERCISE:
      return {...state, [action.payload.id]: action.payload}
    case GET_USER_EXERCISES:
      return {...state, ...action.payload.exercises}
    default:
      return state;
  }
}
