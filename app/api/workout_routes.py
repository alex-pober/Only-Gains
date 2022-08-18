from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Workout
from app.forms import WorkoutForm

workout_routes = Blueprint('workouts', __name__)


#GET /api/workouts/:userId
@workout_routes.route('/<id>')
def get_workout(id):
    workout = Workout.query.filter(Workout.user_id == id).all()
    return (workout.to_dict())

#POST /api/workouts/
