from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Link

class LinkForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired])
    link = StringField('Link', validators=[DataRequired])
