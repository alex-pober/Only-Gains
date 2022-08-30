const GET_USER_WORKOUTS = 'session/GET_USER_WORKOUTS'
const CREATE_WORKOUT = 'session/CREATE_WORKOUT';

const setUserWorkouts = (workouts) => ({
    type: GET_USER_WORKOUTS,
    payload: workouts
})

const setWorkout = (workout) => ({
    type: CREATE_WORKOUT,
    payload: workout
})

const initialState = { workout: null };

export const getUserWorkouts = (id) => async dispatch => {
    const response = await fetch(`/api/workouts/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(setUserWorkouts(data));
        return data
    }
}

export const createWorkout = (user_id, title, notes) => async (dispatch) => {
    const response = await fetch('/api/workouts/createworkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id,
            title,
            notes
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(setWorkout(data))
        return data
    }
}


export default function reducer(state = initialState, action){
    switch (action.type){
        case CREATE_WORKOUT:
            return {...state, [action.payload.id]: action.payload}
        case GET_USER_WORKOUTS:
            return {...action.payload.workout}



        default:
            return state;
    }
}
