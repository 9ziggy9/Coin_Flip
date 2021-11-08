from .db import db

class Portfolio(db.Model):
    __tablename__ = "portfolio"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey("users.id"), nullable=False)
    crypto_id = db.Column(db.Integer, db.ForeignKey("cryptocurrency.id"), nullable=False)
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
    cryptocurrency = db.relationship("Cryptocurrency", back_populates="porfolio")
