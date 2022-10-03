from email import message
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


# Edit user information
@user_routes.post('/<string:username>/edit')
@login_required
def user(username):
    print(request.get_json(), "request ***********************")
    user = User.query.filter_by(username=username).first_or_404(
        description="User does not exist")
    data = request.get_json()
    print(data, "DATA **********************")
    display_name = data['displayName']
    bio = data['bio']

    if user == current_user:
        user.display_name = display_name
        user.bio = bio
        db.session.commit()
        return {
            'message': 'Successfully updated user information.',
            'user': user.to_dict()
        }

    return {'Message': 'You are not authorized to edit this information.'}, 401
