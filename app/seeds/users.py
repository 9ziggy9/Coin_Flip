from app.models import db, User, Transaction


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', cash=30000)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', cash=400)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', cash=42000.69)
    revan = User(
        username="Revan", email="revan@revan.com", password='password', cash=50000000.02)
    david = User(
        username="David", email="david@david.com", password='password', cash=5000)
    victor = User(
        username="Victor", email="victor@victor.com", password="password", cash=235400)
    harrison = User(
        username="Harrison", email="harrison@harrison.com", password="password", cash=920920)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(revan)
    db.session.add(david)
    db.session.add(victor)
    db.session.add(harrison)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
