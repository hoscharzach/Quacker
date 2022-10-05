from venv import create
from .db import db
import sqlalchemy
from sqlalchemy.sql import func
from sqlalchemy.orm import validates
from sqlalchemy.ext.orderinglist import ordering_list

likes = db.Table('likes',
                 db.Column('user_id', db.Integer, db.ForeignKey(
                     'users.id'), primary_key=True),
                 db.Column('post_id', db.Integer, db.ForeignKey(
                     'posts.id'), primary_key=True)
                 )


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, index=True)
    content = db.Column(db.String(280), nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    parent_id = db.Column(db.ForeignKey('posts.id'), index=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    images = db.relationship(
        'Image', backref='post', cascade='all, delete')
    replies = db.relationship(
        'Post', backref=db.backref(
            'parent',
            remote_side=[id]),
        cascade='all, delete',
        order_by="desc(Post.created_at)",
        collection_class=ordering_list('created_at'),
        lazy="joined",
        join_depth=1
    )

    post_likes = db.relationship(
        'User', secondary=likes, lazy='subquery', backref=db.backref('user_likes', lazy=True)
    )

    __table_args__ = (
        db.Index(
            "my_idx",
            parent_id,
            created_at,
        ),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'inReplyTo': self.parent_id,
            'content': self.content,
            'user': self.user.to_dict_basic_info(),
            'images': [img.to_dict() for img in self.images],
            'numReplies': len(self.replies),
            'numLikes': len(self.post_likes),
            'userLikes': [x.id for x in self.post_likes],
            'hasImages': len(self.images) > 0,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    def to_dict_single(self):
        return {
            'id': self.id,
            'inReplyTo': self.parent_id,
            'parent': self.parent.to_dict_basic_info() if self.parent else None,
            'content': self.content,
            'user': self.user.to_dict_basic_info(),
            'images': [img.to_dict() for img in self.images],
            'replies': [x.to_dict_basic_info() for x in self.replies],
            'numLikes': len(self.post_likes),
            'userLikes': [x.id for x in self.post_likes],
            'numReplies': len(self.replies),
            'hasImages': len(self.images) > 0,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    def to_dict_basic_info(self):
        return {
            'id': self.id,
            'content': self.content,
            'parent': self.parent.to_dict_parent() if self.parent else None,
            'user': self.user.to_dict_basic_info(),
            'inReplyTo': self.parent_id,
            'numLikes': len(self.post_likes),
            'userLikes': [x.id for x in self.post_likes],
            'images': [img.to_dict() for img in self.images],
            'numReplies': len(self.replies),
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    def get_date(self):
        return {
            'date': self.created_at
        }

    def to_dict_parent(self):
        return {
            'id': self.id,
            'content': self.content,
            'user': self.user.to_dict_basic_info(),
            'inReplyTo': self.parent_id,
            'images': [img.to_dict() for img in self.images],
            'numReplies': len(self.replies),
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    @ validates('content')
    def validate_content(self, key, content):
        post_type = 'Reply' if self.parent_id else 'Quack'
        if not content:
            raise AssertionError(f'{post_type} cannot be blank')

        if len(content.strip()) == 0:
            raise AssertionError(
                f'{post_type} must contain at least one character')

        if len(content) > 280:
            raise AssertionError(
                f'{post_type} cannot be longer than 280 characters.')

        return content
