from app.models import db, Cryptocurrency
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_cryptocurrency():
    doge =  Cryptocurrency(name='Dogecoin', symbol='DOGE', price=0.69)
    bitcoin =  Cryptocurrency(name='Bitcoin', symbol='BTC', price=69420.00)
    ethereum = Cryptocurrency(name='Ethereum', symbol='ETH', price=4200.69)

    db.session.add(doge)
    db.session.add(bitcoin)
    db.session.add(ethereum)
    db.session.commit()

def undo_cryptocurrency():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
