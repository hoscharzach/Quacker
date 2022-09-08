# from flask_wtf import FlaskForm
# from wtforms import StringField
# from wtforms.validators import IntegerField, DataRequired, ValidationError
# from app.models import Post


# def content_length(form, field):
#     content = field.data
#     if len(content) < 1 or len(content) > 280:
#         raise ValidationError('Content must be between 1 and 280 characters')


# class PostForm(FlaskForm):
#     content = StringField('content', validators=[
#                           DataRequired(), content_length])
#     parent_id = IntegerField('parentId')
#     # images =
