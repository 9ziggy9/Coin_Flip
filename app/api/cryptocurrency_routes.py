from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Cryptocurrency

cryptocurrency_routes = Blueprint('cryptocurrency', __name__)

@cryptocurrency_routes.route('/')
@login_required
def cryptocurrency():
    cryptocurrencies = Cryptocurrency.query.all()
    return {'cryptocurrency': [cryptocurrency.to_dict() for cryptocurrency in cryptocurrencies]}
