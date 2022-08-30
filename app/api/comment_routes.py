from flask import Blueprint
from flask_login import login_required
from app.models import Comment

comment_routes = Blueprint('comments', __name__)


@comment_routes.get('/')
def all_posts():
    all_comments = Comment.query.all()
    return {'allComments': [comment.to_dict() for comment in all_comments]}
