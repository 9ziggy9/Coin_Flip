from .db import db

class Cryptocurrency(db.Model):
    __table__name="cryptocurrency"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    symbol = db.Column(db.String(15), nullable=False)
    price = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'price': self.price
        }

    transactions = db.relationship("Transaction", back_populates="cryptocurrency")
    portfolio = db.relationship("Portfolio", back_populates="cryptocurrency")
