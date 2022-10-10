from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, User, db, Image
from sqlalchemy import func

search_routes = Blueprint('search', __name__)


@search_routes.get('/<string:query>')
def initial_search_query(query):

    if not query:
        return {'error': 'Query required'}, 404

    parsed = query.split('=')[0]

    users = User.query.filter(User.username.contains(
        parsed.lower())).order_by(User.username).paginate(page=1, per_page=5)
    posts = Post.query.filter(Post.content.contains(
        parsed.lower())).order_by(Post.created_at.desc()).paginate(page=1, per_page=5)

    return {'users': [user.to_dict() for user in users.items], 'posts': [post.to_dict() for post in posts.items], 'morePosts': posts.has_next, 'moreUsers': users.has_next}


@search_routes.get('/posts/<string:query>/<int:page>')
def get_more_posts(query, page):

    parsed = query.split('=')[0]

    posts = Post.query.filter(Post.content.contains(
        parsed.lower())).order_by(Post.created_at.desc()).paginate(page=page, per_page=5)

    return {'posts': [post.to_dict() for post in posts.items], 'hasMore': posts.has_next}
