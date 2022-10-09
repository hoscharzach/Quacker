from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, User, db, Image
from sqlalchemy import func

search_routes = Blueprint('search', __name__)


@search_routes.get('/<string:query>/users/<int:usersPage>/posts/<int:postsPage>')
def search(query, usersPage, postsPage):
    users = User.query.filter(User.username.contains(
        query.lower())).paginate(page=usersPage, per_page=5)
    posts = Post.query.filter(Post.content.contains(
        query.lower())).paginate(page=postsPage, per_page=5)

    return {'users': [user.to_dict() for user in users.items], 'posts': [post.to_dict() for post in posts.items]}
