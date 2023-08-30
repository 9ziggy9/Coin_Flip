from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = 'transactions'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    crypto_id = db.Column(db.Integer,
                        db.ForeignKey(add_prefix_for_prod("cryptocurrency.id")),
                        nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey(add_prefix_for_prod("users.id")),
                        nullable=False)
    type = db.Column(db.String(4), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    createdAt = db.Column(db.DateTime(), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'crypto_id': self.crypto_id,
            'user_id': self.user_id,
            'type': self.type,
            'price': self.price,
            'quantity': self.quantity,
            'createdAt': self.createdAt
        }


    user = db.relationship("User", back_populates="transactions")

    cryptocurrency = db.relationship("Cryptocurrency", back_populates="transactions")
