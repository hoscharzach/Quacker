from flask import Blueprint, request
from flask_login import login_required
from app.models import Comment

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


# add comment to specific post
@comment_routes.post('/posts/<int:postid>/comments')
def post_new_comment(postid):
    data = request.get_json()

    # update comment

    # delete comment
