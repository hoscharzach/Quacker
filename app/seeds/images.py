from app.models import db, Image
import os
from random import randint

image_list = [
    "https://quacker-app.s3.us-east-2.amazonaws.com/0e70a28561314bd5b35c4c17e6279e40.png",
    "https://quacker-app.s3.us-east-2.amazonaws.com/06eb3be5dad548519dab860b23ed96f8.jpg",
    "https://quacker-app.s3.us-east-2.amazonaws.com/05bfb6f584d24140973ce694242684d3.png",
    "https://quacker-app.s3.us-east-2.amazonaws.com/0497e387d8e04dcaaa878c62a85f4900.png",
    "https://quacker-app.s3.us-east-2.amazonaws.com/03a94cf5ff6940a8bd0164569dfcfc0b.png",
    "https://quacker-app.s3.us-east-2.amazonaws.com/0854d09678394bafbcd15d9b4d3be30a.jpg",
    "https://quacker-app.s3.us-east-2.amazonaws.com/09a8fd24cd1249eabf3998959e5ea37b.jpg",
    "https://quacker-app.s3.us-east-2.amazonaws.com/0a82a08ab2d04d1ca8e2c5acae541048.png",
    "https://quacker-app.s3.us-east-2.amazonaws.com/0df1a68201744e5086098e632a436041.png",
    "https://quacker-app.s3.us-east-2.amazonaws.com/16c070d1801d41918054ee5145248c45.jpg",
    "https://quacker-app.s3.us-east-2.amazonaws.com/171a8dfc2427461793d81a8389002e65.jpg",
    "https://quacker-app.s3.us-east-2.amazonaws.com/17a395746f8e486795cf0bada2722312.jpg",
    "https://quacker-app.s3.us-east-2.amazonaws.com/a7917b467b1f4a4f955a34b05cfb104b.jpg",
    "https://quacker-app.s3.us-east-2.amazonaws.com/8ac37e08621e46dd8ad219c0f36d8ebf.png",
    "https://quacker-app.s3.us-east-2.amazonaws.com/bba15638627f41d382942be8c6565de3.jpg",
    "https://quacker-app.s3.us-east-2.amazonaws.com/ce2c8dbab5544f7da50bdf3382f9eaaf.png",
    "https://quacker-app.s3.us-east-2.amazonaws.com/c069b4315eb34bda8ee41fb27954c530.jpg",
    "https://quacker-app.s3.us-east-2.amazonaws.com/3b8f40b2c5d844ff954b911b6ad185bb.jpg",
]

# Adds a demo user, you can add other users here if you want


def seed_images():
    for i in range(1, 2000):

        if i % 5 == 0:
            image1 = Image(
                url=image_list[randint(0, 17)],
                post_id=i
            )
            db.session.add(image1)
            image2 = Image(
                url=image_list[randint(0, 17)],
                post_id=i
            )
            db.session.add(image2)
            image3 = Image(
                url=image_list[randint(0, 17)],
                post_id=i
            )
            db.session.add(image3)
            image4 = Image(
                url=image_list[randint(0, 17)],
                post_id=i
            )
            db.session.add(image4)
            db.session.commit()

        elif i % 2 == 0:
            image = Image(
                url=image_list[randint(0, 17)],
                post_id=i
            )
            db.session.add(image)
            db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
