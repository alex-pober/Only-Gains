from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Workout, Day
from app.forms import DayForm

day_routes = Blueprint('days', __name__)

#GET /api/days/workout_id
@day_routes.route('<id>')
def get_days(id):
    days = Day.query.filter(Day.workout_id == id).all()
    return {'day': [day.to_dict() for day in days]}

#POST /api/days/
@day_routes.route('/createTrainingDay', methods=["POST"])
@login_required
def new_day():
    data = request.json
    form = DayForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        day = Day(
            workout_id=data['workout_id'],
            title=form.data['title'],
            description=form.data['description']
        )
        db.session.add(day)
        db.session.commit()
        return day.to_dict()
    return (form.errors)

#PUT

#DELETE
