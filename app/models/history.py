from .db import db

class History(db.Model):
    __table__name="history"

    id = db.Column(db.Integer, primary_key=True)
    crypto_id = db.Column(db.String(50), nullable=False)
    prices = db.Column(db.String())

    def to_dict(self):
        return {
            'id': self.id,
            'crypto_id': self.crypto_id,
            'prices': self.price
        }

    transactions = db.relationship("Transaction", back_populates="cryptocurrency")
    portfolio = db.relationship("Portfolio", back_populates="cryptocurrency")
