from .db import db

class Cryptocurrency(db.Model):
    __table__name="cryptocurrency"
    id = db.Column(db.Integer, primary_key=True)
