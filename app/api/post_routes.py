from flask import Blueprint
from flask_login import login_required
from app.models import Post

post_routes = Blueprint('posts', __name__)


@post_routes.get('/')
def all_posts():
    all_posts = Post.query.all()
    return {'allPosts': [post.to_dict() for post in all_posts]}
