from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, User, db, Image, user
from sqlalchemy.orm import lazyload
from sqlalchemy.orm import load_only
from app.seeds.posts import post_list
from app.seeds.images import image_list
from random import randint
from sqlalchemy import func

post_routes = Blueprint('posts', __name__)


# show all likes for post
@post_routes.get('/<int:id>/showlikes')
def get_likes_for_post(id):
    post = Post.query.get_or_404(id, description="Post does not exist")
    return {'likes': [x.to_dict() for x in post.post_likes]}


# toggle like on post by post id
@post_routes.post('/<int:id>/like')
@login_required
def like_post(id):
    post = Post.query.get_or_404(id, description="Post does not exist")

    if current_user not in post.post_likes:
        post.post_likes.append(current_user)
        db.session.commit()
        return {'updatedLikes': post.post_likes_dict(), 'postId': id, 'act': 'add'}
    elif current_user in post.post_likes:
        post.post_likes.remove(current_user)
        db.session.commit()
        return {'updatedLikes': post.post_likes_dict(), 'postId': id, 'act': 'del'}


@post_routes.get('/dummy')
@login_required
def create_dummy_posts():
    for i in range(1, 4):
        if i == 1:
            post = Post(
                user_id=randint(1, 3),
                content=post_list[(randint(0, 12))]
            )
            db.session.add(post)
            db.session.commit()
        if i == 2:
            post1 = Post(
                user_id=randint(1, 3),
                content=post_list[randint(0, 12)]
            )
            db.session.add(post1)
            image1 = Image(
                url=image_list[(randint(0, 17))],
                post_id=post.id
            )
            image2 = Image(
                url=image_list[(randint(0, 17))],
                post_id=post.id
            )
            image3 = Image(
                url=image_list[(randint(0, 17))],
                post_id=post.id
            )
            image4 = Image(
                url=image_list[(randint(0, 17))],
                post_id=post.id
            )

            db.session.add(image1)
            db.session.add(image2)
            db.session.add(image3)
            db.session.add(image4)
            db.session.commit()
        if i == 3:
            post2 = Post(
                content=post_list[randint(0, 12)],
                user_id=randint(1, 3)
            )
            db.session.add(post2)
            image5 = Image(
                url=image_list[randint(0, 15)],
                post_id=post2.id
            )
            db.session.add(image5)
            db.session.commit()

    oldest_posts = Post.query.filter(Post.created_at).limit(3)
    for post in oldest_posts:
        db.session.delete(post)
        db.session.commit()

    return {'message': 'success'}


@post_routes.get('/<string:username>/query/<string:query>')
def get_user_liked_posts(username, query):
    user = User.query.filter_by(username=username).first_or_404(
        description=f'There is no user by the name {username}')

    if (query == 'quacks'):
        posts = Post.query.filter_by(user_id=user.id, parent_id=None).order_by(
            Post.created_at.desc()).limit(10)

    elif (query == 'replies'):
        posts = Post.query.filter_by(user_id=user.id).filter(
            Post.parent_id != None).order_by(Post.created_at.desc()).limit(10)

    elif (query == 'media'):
        posts = db.session.query(Post).join(Post.images).group_by(
            Post).having(func.count(Image.id) > 0).order_by(Post.created_at.desc()).limit(10)

    elif (query == 'likes'):
        posts = user.user_likes[0:10]

    return {'posts': [x.to_dict_single() for x in posts], 'user': user.to_dict()}


@post_routes.post('/home/new')
@login_required
def get_new_posts():
    latest_post_id = request.get_json()
    latest_post = Post.query.get(latest_post_id)
    new_posts = Post.query.filter(Post.id > latest_post.id).filter_by(parent_id=None).order_by(
        Post.created_at.desc()).limit(10)

    return {'posts': [post.to_dict() for post in new_posts]}


@post_routes.get('/home/<int:page>')
@login_required
def my_home_page(page):

    posts = Post.query.filter_by(parent_id=None).order_by(
        Post.created_at.desc()).paginate(page=page, per_page=10)
    return {'posts': [post.to_dict() for post in posts.items], 'page': page}


# post on user's profile page
@ post_routes.get('/<string:username>/quacks')
@ login_required
def profile_page(username):

    user = User.query.options(load_only('id')).filter_by(username=username).first_or_404(
        description=f'There is no user by the name {username}')

    posts = Post.query.filter_by(user_id=user.id).order_by(
        Post.created_at.desc()).limit(30)

    return {'posts': [post.to_dict_single() for post in posts]}


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
    print(new_post.to_dict_single())
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


# find post by id
@ post_routes.get('/<int:id>')
def find_post_by_id(id):
    post = Post.query.get_or_404(id, description="Post does not exist")
    return {'post': post.to_dict_single()}
