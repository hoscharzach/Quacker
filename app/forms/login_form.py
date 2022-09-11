from logging.config import valid_ident
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def password_exists(form, field):
    # Checking if user exists
    password = field.data
    if not password or len(password.strip()) == 0:
        raise ValidationError("Password is required")


def email_validation(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()

    if not email or len(email.strip()) == 0:
        raise ValidationError("Email is required")


def login_validation(form, field):
    email = field.data
    password = form.data['password']

    if email and password:
        user = User.query.filter(User.email == email).first()
        if not user or not user.check_password(password):
            raise ValidationError('Credentials were incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[
                        email_validation, login_validation])
    password = StringField('password', validators=[password_exists])
