from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Workout, Day, Exercise
from app.forms import WorkoutForm

exercise_routes = Blueprint('exercises', __name__)

#GET /api/exercise/day_id
@exercise_routes.route('<id>')
def get_exercises(id):
    exercise = Exercise.query.filter(Exercise.day_id == id).all()
    return (exercise.to_dict())

#POST /api/days/
@dexercise_routes.route('/', methods=["POST"])
@login_required
