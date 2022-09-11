from .db import db
from sqlalchemy.sql import func
from sqlalchemy.orm import validates


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(280), nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    parent_id = db.Column(db.ForeignKey('posts.id'))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    images = db.relationship(
        'Image', backref='post', cascade='all, delete')
    replies = db.relationship(
        'Post', backref=db.backref('parent', remote_side=[id]), cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'inReplyTo': self.parent.id if self.parent != None else None,
            'parent': self.parent.to_dict_basic_info() if self.parent else None,
            'content': self.content,
            'user': self.user.to_dict_basic_info(),
            'images': [x.to_dict() for x in self.images],
            'replies': [x.to_dict() for x in self.replies],
            'numReplies': len(self.replies),
            'numImages': len(self.images),
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    def to_dict_basic_info(self):
        return {
            'id': self.id,
            'content': self.content,
            'user': self.user.to_dict_basic_info(),
            'inReplyTo': self.parent.id if self.parent else None,
            'images': [x.to_dict() for x in self.images],
            'numReplies': len(self.replies),
            'numImages': len(self.images),
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    @validates('content')
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
