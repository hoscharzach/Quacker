from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    bio = db.Column(db.String(250))
    profile_pic = db.Column(db.String(250))
    profile_background = db.Column(db.String(250))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'bio': self.bio,
            'profilePic': self.profile_pic,
            'profileBackground': self.profile_background
        }

    posts = db.relationship(
        'Post', back_populates='users', cascade='all, delete')
    comments = db.relationship(
        'Comment', back_populates='users', cascade='all, delete')


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(280), nullable=False)
    poster_id = db.Column(
        db.String(255), db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    images = db.relationship(
        'Image', back_populates='posts', cascade='all, delete')
    comments = db.relationship(
        'Comment', back_populates='posts', cascade='all, delete')

    def to_dict(self):
        return {
            'content': self.content,
            'authorId': self.poster_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'images': [x.to_dict() for x in self.images],
            'comments': [x.to_dict() for x in self.comments]
        }


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(280), nullable=False)
    poster_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    images = db.relationship(
        'Image', back_populates='comments', cascade='all, delete')

    def to_dict(self):
        return {
            'content': self.content,
            'author': self.poster_id,
            'postId': self.post_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    def to_dict(self):
        return {
            'imageUrl': self.image_url,
            'postId': self.post_id,
            'commentId': self.comment_id
        }
