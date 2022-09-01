from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Exercise
from app.forms import ExerciseForm

exercise_routes = Blueprint('exercises', __name__)

#GET /api/exercise/day_id
@exercise_routes.route('<id>')
def get_exercises(id):
    exercises = Exercise.query.filter(Exercise.day_id == id).all()
    return {'exercises': [exercise.to_dict() for exercise in exercises]}

#POST /api/days/
@exercise_routes.route('/', methods=["POST"])
@login_required
def new_exercise():
    data = request.json
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        exercise = Exercise(
            day_id=data['day_id'],
            title=form.data['title'],
            reps=form.data['reps']
        )
        db.session.add(exercise)
        db.session.commit()
        return exercise.to_dict()
    return (form.errors)

#PUT

#DELETE
