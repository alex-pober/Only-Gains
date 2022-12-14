from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Workout
from app.forms import WorkoutForm

workout_routes = Blueprint('workouts', __name__)


#GET /api/workouts/:userId
@workout_routes.route('/<id>')
def get_workout(id):
    workouts = Workout.query.filter(Workout.user_id == id).all()
    return {'workout': [workout.to_dict() for workout in workouts]}

#POST /api/workouts/:userId
@workout_routes.route('/createworkout', methods=['POST'])
@login_required
def new_workout():
    data = request.json
    form = WorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workout = Workout(
            user_id=data['user_id'],
            title=form.data['title'],
            notes=form.data['notes']
        )
        db.session.add(workout)
        db.session.commit()
        return workout.to_dict()
    return (form.errors)

#DELETE
@workout_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_workout(id):
    workout = Workout.query.get(id)
    db.session.delete(workout)
    db.session.commit()
    return "Workout Deleted"

#PATCH
@workout_routes.route('/<id>', methods=['PATCH'])
@login_required
def update_workout(id):
    form = WorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workout = Workout.query.get(id)
        workout.title = form.data['title']
        workout.notes=form.data['notes']
        db.session.commit()
        return workout.to_dict()
    return (form.errors)
