from .db import db
from sqlalchemy.sql import func


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(280), nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    images = db.relationship(
        'Image', backref='posts', cascade='all, delete')
    comments = db.relationship(
        'Comment', backref='posts', cascade='all, delete')

    def to_dict(self):
        return {
            'content': self.content,
            'authorId': self.user_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'images': [x.to_dict() for x in self.images],
            'comments': [x.to_dict() for x in self.comments]
        }
