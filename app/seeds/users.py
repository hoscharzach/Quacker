from app.models import db, User
import os


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', display_name='demolition', bio="faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequa", profile_background="https://quacker-app.s3.us-east-2.amazonaws.com/bfd2604b6bfe4ac0bf9c680fd2f060be.jpg", profile_pic="https://quacker-app.s3.us-east-2.amazonaws.com/68711b54d34a4b2fae302c0617523267.jpg")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', bio="faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequa", display_name='marniethethird', profile_background="https://quacker-app.s3.us-east-2.amazonaws.com/0bc25402ae08445ab287a29e189b9828.jpg", profile_pic="https://quacker-app.s3.us-east-2.amazonaws.com/dcc1deea3d684a6ea45b72d29a3f9c14.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', display_name='bobbiefett', bio="faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequa", profile_background="https://quacker-app.s3.us-east-2.amazonaws.com/1a1161c1049f4f12b785698ba6f883b8.jpg", profile_pic="https://quacker-app.s3.us-east-2.amazonaws.com/8ddd635a750a44b5a2bd468708312e9e.jpg")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
