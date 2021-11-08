from app.models import db, User, Transaction
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_transactions():
    test_trans1 = Transaction(crypto_id=1, user_id=1, type='buy', price=0.69, quantity=0.5, createdAt=datetime.now());
    test_trans2 = Transaction(crypto_id=1, user_id=1, type='sell', price=20.49, quantity=2.0, createdAt=datetime.now());
    test_trans3 = Transaction(crypto_id=2, user_id=1, type='buy', price=6.49, quantity=2.5, createdAt=datetime.now());
    test_trans4 = Transaction(crypto_id=3, user_id=1, type='sell', price=0.01, quantity=10.5, createdAt=datetime.now());
    test_trans5 = Transaction(crypto_id=3, user_id=1, type='buy', price=1.69, quantity=0.25, createdAt=datetime.now());

    db.session.add(test_trans1)
    db.session.add(test_trans2)
    db.session.add(test_trans3)
    db.session.add(test_trans4)
    db.session.add(test_trans5)
    db.session.commit()

def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
