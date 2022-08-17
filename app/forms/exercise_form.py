from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class ExerciseForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired])
    reps = StringField('Reps')
