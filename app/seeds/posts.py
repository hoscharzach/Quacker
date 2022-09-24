from app.models import db, Post
from random import randint

post_list = [
    "Waterfowl have as many as 12,000 separate skin muscles used for feather control. Ducks and geese lift or compress their plumage in various ways to help regulate body heat, dive underwater, and express emotions, such as aggression or amorousness.",
    "Many female ducks and ducklings have drab plumage with darker feathers forming a cap on their head and stripes extending across their eyes. This 'masking' helps camouflage the birds' shiny eyes, which could be seen by predators or pecked at by hungry offspring or siblings.",
    "In the fall, wood ducks largely feed on acorns in flooded bottomlands. Researchers who conducted a 'taste test' on captive wood ducks found the birds preferred tiny willow oak acorns over larger acorns produced by other oak species.",
    "Waterfowl wings provide the two essential elements of flight. Primary feathers (those on the tips of the wings) provide thrust, while secondary feathers (those on the rear edge of the wings) provide lift.",
    "Harlequin ducks typically nest on snags or in rocky crevices along streams. These remarkable birds feed on invertebrates by diving to the bottom of rushing torrents and walking upstream along the rocky bottom.",
    "Most waterfowl have black tipped feathers on the leading edges of their wings. These feathers contain the pigment melanin, which imparts a structural rigidity that makes them less subject to wear and abrasion.",
    "Buffleheads are often called 'butterballs' by waterfowlers for good reason. Researchers have found that these birds store upwards of four ounces of fat—more than a quarter of their body weight—in preparation for fall migration.",
    "The oldest known duck to be taken by a hunter was a canvasback harvested at the ripe old age of 29. The oldest known goose to be taken by a hunter was a Canada goose of the same age.",
    "Buffleheads nest in holes made in hollow trees by nesting flickers, a common species of woodpecker. Pileated woodpeckers create many of the nesting sites used by wood ducks and other larger cavity-nesting ducks.",
    "Did you know that hen mallards molt during late fall or winter? The birds replace their 'basic' plumage acquired during the summer molt with darker brown 'alternate' plumage. These darker, more clearly defined feathers help camouflage the birds while nesting in the spring.",
    "African magpie geese form trios consisting of a male and two females that lay eggs in a single nest, and all three birds share incubation responsibilities.",
    "The fastest duck ever recorded was a red-breasted merganser that attained a top airspeed of 100 mph while being pursued by an airplane. This eclipsed the previous speed record held by a canvasback clocked at 72 mph.",
    "Severe weather will occasionally trigger a mass migration of waterfowl known as a grand passage. In early November 1995, following a severe blizzard in the Prairie Pothole Region, millions of migrating ducks and geese jammed radar systems and grounded flights in various cities."


]


def seed_posts():
    for i in range(1000):
        post = Post(
            content=post_list[randint(0, 12)],
            parent_id=None,
            user_id=randint(1, 3)
        )
        db.session.add(post)
    db.session.commit()

    for i in range(1000):
        post = Post(
            content=post_list[randint(0, 12)],
            parent_id=randint(1, 2000),
            user_id=randint(1, 3)
        )
        db.session.add(post)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
