from app.models import db, Portfolio
from datetime import datetime


# Adds porfolios
def seed_portfolios():
    portfolio_1 = Portfolio(user_id=1, crypto_id=1, quantity=100, purchase_price=96.20)
    portfolio_2 = Portfolio(user_id=1, crypto_id=2, quantity=50, purchase_price=656.00)
    portfolio_3 = Portfolio(user_id=1, crypto_id=3, quantity=20, purchase_price=66221.00)
    portfolio_5 = Portfolio(user_id=2, crypto_id=2, quantity=96, purchase_price=655.00)
    portfolio_6 = Portfolio(user_id=2, crypto_id=3, quantity=42, purchase_price=66221.00)
    portfolio_7 = Portfolio(user_id=3, crypto_id=1, quantity=15, purchase_price=96.10)
    portfolio_8 = Portfolio(user_id=3, crypto_id=2, quantity=5, purchase_price=652.00)
    portfolio_9 = Portfolio(user_id=3, crypto_id=3, quantity=32, purchase_price=63012.00)

    db.session.add(portfolio_1)
    db.session.add(portfolio_2)
    db.session.add(portfolio_3)
    db.session.add(portfolio_5)
    db.session.add(portfolio_6)
    db.session.add(portfolio_7)
    db.session.add(portfolio_8)
    db.session.add(portfolio_9)
    db.session.commit()

def undo_portfolios():
    db.session.execute('TRUNCATE portfolio RESTART IDENTITY CASCADE;')
    db.session.commit()
