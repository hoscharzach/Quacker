# from flask import Blueprint, request
# from flask_login import login_required, current_user
# from app.models import Comment, db

# comment_routes = Blueprint('comments', __name__)


# @comment_routes.get('')
# def all_posts():
#     all_comments = Comment.query.all()
#     return {'allComments': [comment.to_dict() for comment in all_comments]}


# # all comments for specific post
# @comment_routes.get('/posts/<int:postid>/comments')
# def get_all_commments_from_post(postid):
#     comments = Comment.query.filter_by(Comment.post_id == postid)
#     return {'comments': [comment.to_dict() for comment in comments]}


# @comment_routes.delete('/comments/<int:id>')
# @login_required
# def delete_comment_by_id(id):
#     comment = Comment.query.get_or_404(id)
#     if comment.poster_id == current_user.id:
#         db.session.delete(comment)
#         db.session.commit()
#         return {'message': 'Successfully deleted comment'}
#     else:
#         return {'You are not authorized to delete this comment'}, 403


# @comment_routes.put('/comments/<int:id>')
# @login_required
# def edit_comment_by_id(id):
#     data = request.get_json()
#     content = data['content']
#     comment = Comment.query.get_or_404(id)
#     if comment.poster_id == current_user.id:
#         comment.content = content
#         db.session.commit()
#         return {'comment': comment.to_dict()}
#     else:
#         return {'message': 'You are unauthorized to edit this comment'}, 403

# update comment

# delete comment
