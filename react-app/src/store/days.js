const GET_USER_TRAINING_DAYS = 'session/GET_USER_TRAINING_DAYS'
const CREATE_TRAINING_DAY = 'session/CREATE_TRAINING_DAY'

const setTrainingDays = (days) => ({
  type: GET_USER_TRAINING_DAYS,
  payload: days
})

const setTrainingDay = (day) => ({
  type: CREATE_TRAINING_DAY,
  payload: day
})

const initialState = { days: null };

export const getTrainingDays = (workoutId) => async dispatch => {
  const response = await fetch(`/api/days/${workoutId}`)
  if (response.ok) {
      const data = await response.json();
      if (data.errors) {
          return;
      }
      dispatch(setTrainingDays(data));
      return data
  }
}

export const createTrainingDay = (workout_id, title, description) => async (dispatch) => {
  const response = await fetch('/api/days/createTrainingDay', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          workout_id,
          title,
          description
      })
  })
  if (response.ok) {
      const data = await response.json();
      dispatch(setTrainingDay(data))
      return data
  }
}

export default function reducer(state = initialState, action){

  switch (action.type){
      case CREATE_TRAINING_DAY:
          return {...state, [action.payload.id]: action.payload}
      case GET_USER_TRAINING_DAYS:
          return {...action.payload.day}



      default:
          return state;
  }
}
