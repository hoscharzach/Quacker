from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, User, db, Image

post_routes = Blueprint('posts', __name__)


# Do pagination here, loading 10 at a time
@post_routes.get('/home')
@login_required
def my_home_page():

    posts = Post.query.filter_by(parent_id=None).order_by(Post.created_at.desc()).limit(
        20)

    return {'posts': [post.to_dict_replies() for post in posts]}


# post on user's profile page
@ post_routes.get('/<string:username>')
@ login_required
def profile_page(username):

    user = User.query.filter_by(
        username=username).first_or_404(description=f'There is no user by the name {username}')

    return {'posts': [post.to_dict() for post in user.posts]}


# create new post
@ post_routes.post('/new')
@ login_required
def create_post():
    data = request.get_json()
    content = data['content']
    images = data['images']
    parent_id = data['parentId'] if 'parentId' in data else None

    try:
        new_post = Post(
            parent_id=parent_id,
            content=content,
            user_id=current_user.id)

        db.session.add(new_post)
        db.session.commit()
    except AssertionError as error:
        return {'error': f'{error}'}, 400

    for image in images:
        new_image = Image(
            url=image['url'],
            post_id=new_post.id
        )
        db.session.add(new_image)
    db.session.commit()

    return {'post': new_post.to_dict()}


# delete post by id
@ post_routes.delete('/<int:id>')
@ login_required
def delete_post(id):
    post = Post.query.get_or_404(id)

    if post.user.id == current_user.id:
        db.session.delete(post)
        db.session.commit()
    else:
        return {'error': 'You are not authorized to delete this'}, 403
    return {'message': 'Successfully deleted'}


# update post
@ post_routes.put('/<int:id>')
@ login_required
def update_post(id):
    post = Post.query.get_or_404(id)

    data = request.get_json()
    content = data['content']

    try:
        post.content = content
    except AssertionError as error:
        return {'error': f'{error}'}, 400

    db.session.commit()
    return {'post': post.to_dict()}


# check if post has parent
@ post_routes.get('/<int:id>/parent')
def check_if_post_has_parent(id):
    post = Post.query.get_or_404(id)
    if post.parent:
        return {'hasParent': True, 'parent': post.parent.id}
    else:
        return {'hasParent': False}


# find post by id
@ post_routes.get('/<int:id>')
def find_post_by_id(id):
    post = Post.query.get_or_404(id)
    return {'post': post.to_dict()}
