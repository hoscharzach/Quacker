from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, db

comment_routes = Blueprint('comments', __name__)


@comment_routes.get('')
def all_posts():
    all_comments = Comment.query.all()
    return {'allComments': [comment.to_dict() for comment in all_comments]}


# all comments for specific post
@comment_routes.get('/posts/<int:postid>/comments')
def get_all_commments_from_post(postid):
    comments = Comment.query.filter_by(Comment.post_id == postid)
    return {'comments': [comment.to_dict() for comment in comments]}




    # update comment

    # delete comment
