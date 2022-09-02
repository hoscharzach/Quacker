from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


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
            'profileBackground': self.profile_background,
            'images': [image.to_dict() for image in self.images]
        }

    def to_dict_basic_info(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }

    def to_dict_only_posts(self):
        return {
            'posts': [post.to_dict() for post in self.posts]
        }

    posts = db.relationship(
        'Post', backref='users', cascade='all, delete')
    comments = db.relationship(
        'Comment', backref='users', cascade='all, delete')
    images = db.relationship(
        'Image', backref='users', cascade='all, delete')
