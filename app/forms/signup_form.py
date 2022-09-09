from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def displayname_exists(form, field):
    display_name = field.data
    user = User.query.filter(User.display_name == display_name).first()
    if user:
        raise ValidationError('Display name is already in use.')


def displayname_length(form, field):
    display_name = field.data
    if len(display_name) < 4 or len(display_name) > 30:
        raise ValidationError(
            'Display name must be between 4 and 30 characters')


def username_length(form, field):
    username = field.data
    if len(username) < 2 or len(username) > 15:
        raise ValidationError(
            'Dispay name must be between 2 and 15 characters')


def password_length(form, field):
    password = field.data
    if len(password) < 5:
        raise ValidationError('Password must be at least 5 characters')


# add email validator


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Username is required"), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(
        message="Email is required"), user_exists])
    password = StringField('password', validators=[
                           DataRequired(message="Password is required"), password_length])
    displayname = StringField('displayname', validators=[
                              DataRequired("Display name is required"), displayname_exists, displayname_length])
