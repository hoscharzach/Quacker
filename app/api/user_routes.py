from email import message
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.get('/<string:username>')
def get_user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return {'user': user.to_dict()}

@user_routes.post('/<string:username>/follow')
@login_required
def follow_user(username):

    # get user that is being followed
    followed_user = User.query.filter_by(username=username).first_or_404()
    followed_user.user_followers.append(current_user)
    db.session.commit()

    return {'message': f'Successfully followed {username}'}

@user_routes.post('/<string:username>/unfollow')
@login_required
def unfollow_user(username):

    #get user that is being unfollowed
    unfollowed_user = User.query.filter_by(username=username).first_or_404()
    unfollowed_user.user_followers.remove(current_user)
    db.session.commit()

    return {'message': f'Successfully unfollowed {username}'}


@user_routes.get('/<string:username>/followers')
def get_followers(username):
    user = User.query.filter_by(username=username).first_or_404()
    return {f'{username} followers': [x.username for x in user.user_followers]}


@user_routes.get('/<string:username>/following')
def get_following(username):
    user = User.query.filter_by(username=username).first_or_404()
    return {f'{username} following': [x.username for x in user.user_following]}


@user_routes.post('/<string:username>/edit')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404(
        description="User does not exist")
    data = request.get_json()

    display_name = data['displayName']
    bio = data['bio']

    if user.id == current_user.id:
        user.display_name = display_name
        user.bio = bio
        db.session.commit()
        return {
            'message': 'Successfully updated user information.',
            'user': user.to_dict()
        }

    return {'Message': 'You are not authorized to edit this information.'}, 401
