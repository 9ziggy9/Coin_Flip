from app.models import db, Portfolio
from datetime import datetime


# Adds porfolios
def seed_portfolios():
    portfolio_1 = Portfolio(user_id=1, crypto_id=1, quantity=100, purchase_price=0.69)
    portfolio_2 = Portfolio(user_id=1, crypto_id=2, quantity=50, purchase_price=69420.00)
    portfolio_3 = Portfolio(user_id=1, crypto_id=3, quantity=20.4, purchase_price=4200.00)
    portfolio_4 = Portfolio(user_id=1, crypto_id=1, quantity=69, purchase_price=0.69)
    portfolio_5 = Portfolio(user_id=2, crypto_id=2, quantity=96, purchase_price=69420.00)
    portfolio_6 = Portfolio(user_id=2, crypto_id=3, quantity=42.5, purchase_price=4200.00)
    portfolio_7 = Portfolio(user_id=3, crypto_id=1, quantity=15, purchase_price=0.69)
    portfolio_8 = Portfolio(user_id=3, crypto_id=2, quantity=5.25, purchase_price=69420.00)
    portfolio_9 = Portfolio(user_id=3, crypto_id=3, quantity=32.9, purchase_price=4200.00)

    db.session.add(portfolio_1)
    db.session.add(portfolio_2)
    db.session.add(portfolio_3)
    db.session.add(portfolio_4)
    db.session.add(portfolio_5)
    db.session.add(portfolio_6)
    db.session.add(portfolio_7)
    db.session.add(portfolio_8)
    db.session.add(portfolio_9)
    db.session.commit()

def undo_portfolios():
    db.session.execute('TRUNCATE portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()
