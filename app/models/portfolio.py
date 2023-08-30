from .db import db, environment, SCHEMA, add_prefix_for_prod

class Portfolio(db.Model):
    __tablename__ = "portfolio"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    crypto_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("cryptocurrency.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    purchase_price = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "crypto_id": self.crypto_id,
            "quantity": self.quantity,
            "purchase_price": self.purchase_price,
        }

    user = db.relationship("User", back_populates="portfolio")
    cryptocurrency = db.relationship("Cryptocurrency", back_populates="portfolio")
