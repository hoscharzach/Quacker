from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, User, db, Image

post_routes = Blueprint('posts', __name__)


@post_routes.get('/')
def all_posts():
    all_posts = Post.query.all()
    return {'allPosts': [post.to_dict() for post in all_posts]}


# Do pagination here, loading 10 at a time
@post_routes.get('/home')
@login_required
def my_home_page():
    user_posts = Post.query.order_by(Post.created_at).limit(
        10).all()
    return {'userPosts': [{'content': 'post 1'}]}
    {'userPosts': [post.to_dict() for post in user_posts]}


# Profile page, all posts by current user
@post_routes.get('/<string:username>')
@login_required
def profile_page(username):
    # find user or 404
    user = User.query.filter_by(
        username=username).first_or_404(description=f'There is no user by the name {username}')

    # find users posts
    user_posts = Post.query.filter(
        Post.user_id == user.id).order_by(Post.created_at).all()

    # return the posts in an array
    return {'user_posts': [post.to_dict() for post in user_posts]}


# create new post, only validation is less than 280 characters, no empty post
@post_routes.post('/new')
@login_required
def create_post():
    data = request.get_json()
    content = data['content']
    images = data['images']

    new_post = Post(
        content=content,
        user_id=current_user.id
    )

    db.session.add(new_post)
    db.session.commit()

    for image in images:
        new_image = Image(
            url=image,
            post_id=new_post.id
        )
        db.session.add(new_image)
        # new_post.images.append(image)
    db.session.commit()

    return {'post': new_post.to_dict()}
