from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, User, db, Image
from sqlalchemy import func, or_

search_routes = Blueprint('search', __name__)


@search_routes.get('/<string:query>')
def initial_search_query(query):
    parsed = query.split('=')[0].replace("+", " ")

    users = User.query.filter(or_(func.lower(User.bio).contains(parsed.lower()), func.lower(User.username).contains(parsed.lower()))).order_by(
        User.username).paginate(page=1, per_page=5)
    posts = Post.query.filter(func.lower(Post.content).contains(
        parsed.lower())).order_by(Post.id.desc()).paginate(page=1, per_page=5)

    return {'query': query, 'users': [user.to_dict() for user in users.items], 'posts': [post.to_dict() for post in posts.items], 'morePosts': posts.has_next, 'moreUsers': users.has_next}


@search_routes.get('/posts/<string:query>/<int:page>')
def get_more_posts(query, page):

    parsed = query.split('=')[0].replace("+", " ")

    posts = Post.query.filter(func.lower(Post.content).contains(parsed.lower())).order_by(
        Post.id.desc()).paginate(page=page, per_page=5)

    return {'posts': [post.to_dict() for post in posts.items], 'hasMore': posts.has_next}
