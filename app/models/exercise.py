from .db import db

class Exercise(db.Model):
    __tablename__ = 'exercises'

    id = db.Column(db.Integer, primary_key=True)
    day_id = db.Column(db.Integer, db.ForeignKey("days.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    reps = db.Column(db.String(20), nullable=True)

    # users = db.relationship("User", back_populates="workouts")

    def to_dict(self):

        return {
            'id': self.id,
            'day_id': self.day_id,
            'title': self.title,
            'reps': self.reps,
        }
