from .db import db

class Day(db.Model):
    __tablename__ = 'days'

    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey("workouts.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(20), nullable=True)

    workout = db.relationship('Workout', back_populates='day')
    exercise = db.relationship('Exercise', back_populates='day', cascade='all, delete')
    def to_dict(self):

        return {
            'id': self.id,
            'workout_id': self.workout_id,
            'title': self.title,
            'description': self.description,
        }
