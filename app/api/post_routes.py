from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, User, db, Image

post_routes = Blueprint('posts', __name__)


# Do pagination here, loading 10 at a time
@post_routes.get('/home')
@login_required
def my_home_page():
    user_posts = Post.query.filter_by(parent=None).order_by(Post.created_at.desc()).limit(
        10)
    return {'posts': [post.to_dict() for post in user_posts]}


# Profile page, all posts by current user
@post_routes.get('/<string:username>')
@login_required
def profile_page(username):

    user = User.query.filter_by(
        username=username).first_or_404(description=f'There is no user by the name {username}')

    return {'posts': [post.to_dict() for post in user.posts]}


# create new post, only validation is less than 280 characters, no empty post
@post_routes.post('/new')
@login_required
def create_post():
    data = request.get_json()
    content = data['content']
    images = data['images']
    parent_id = data['parentId'] if 'parentId' in data else None

    new_post = Post(
        parent_id=parent_id,
        content=content,
        user_id=current_user.id
    )

    db.session.add(new_post)
    db.session.commit()

    for image in images:
        new_image = Image(
            url=image['url'],
            post_id=new_post.id
        )
        db.session.add(new_image)
    db.session.commit()

    return {'post': new_post.to_dict()}

# delete post by id


@post_routes.delete('/<int:id>')
@login_required
def delete_post(id):
    post = Post.query.get_or_404(id)

    if post.user.id == current_user.id:
        db.session.delete(post)
        db.session.commit()
    else:
        return {'error': 'You are not authorized to delete this'}, 403
    return {'message': 'Successfully deleted'}

# update post by id
# change


@post_routes.put('/<int:id>')
@login_required
def update_post(id):
    post = Post.query.get_or_404(id)

    data = request.get_json()
    content = data['content']

    post.content = content

    db.session.commit()
    return {'post': post.to_dict()}


@post_routes.get('/<int:id>/parent')
def check_if_post_has_parent(id):
    post = Post.query.get_or_404(id)
    if post.parent:
        return {'hasParent': True, 'parent': post.parent.id}
    else:
        return {'hasParent': False}


# find post by id
@post_routes.get('/<int:id>')
def find_post_by_id(id):
    post = Post.query.get_or_404(id)
    return {'post': post.to_dict()}


@post_routes.post('/<int:id>/reply')
@login_required
def post_new_reply(id):
    data = request.get_json()
    content = data['content']

    new_reply = Post(
        user_id=current_user.id,
        parent_id=id,
        content=content
    )

    db.session.add(new_reply)
    db.session.commit()

    # print(new_reply.parent)

    return {'comment': new_reply.to_dict()}
