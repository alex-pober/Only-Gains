from .db import db

class Link(db.Model):
    __tablename__ = 'links'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    link = db.Column(db.String(3000), nullable=False)
    click = db.Column(db.Integer)

    user = db.relationship('User', back_populates="link")

    def to_dict(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'link': self.link,
            'click': self.click
        }
