from .db import db

class Workout(db.Model):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.String(3000), nullable=False)

    user = db.relationship('User', back_populates="workout")
    day = db.relationship('Day', back_populates='workout', cascade="all,delete")

    def to_dict(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'notes': self.notes,
        }
