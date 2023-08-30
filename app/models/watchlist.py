from .db import db, environment, SCHEMA, add_prefix_for_prod

association_table = db.Table('Watchlist_Crypto', db.Model.metadata,
    db.Column('watchlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('watchlist.id')), primary_key=True),
    db.Column('crypto_id', db.Integer, db.ForeignKey(add_prefix_for_prod('cryptocurrency.id')), primary_key=True)
)

class Watchlist(db.Model):
    __tablename__ = "watchlist"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "cryptos": [crypto.to_dict() for crypto in self.cryptocurrency]
        }

    user = db.relationship("User", back_populates="watchlist")
    cryptocurrency = db.relationship("Cryptocurrency", secondary=association_table, back_populates="watchlist")
