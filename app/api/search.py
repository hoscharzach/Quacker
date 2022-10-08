from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, User, db, Image

search_routes = Blueprint('search', __name__)


@search_routes.get('/<string:query>')
def search(query):
    users = User.query.filter(
        query in User.username or query in User.display_name or query in User.bio)
    return {'users': [user.to_dict() for user in users]}
