from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Cryptocurrency

cryptocurrency_routes = Blueprint('cryptocurrency', __name__)

@cryptocurrency_routes.route('/')
def cryptocurrency():
    cryptocurrencies = Cryptocurrency.query.all()
    return {'cryptocurrency': [cryptocurrency.to_dict() for cryptocurrency in cryptocurrencies]}

@cryptocurrency_routes.route('/', methods=['POST'])
def search_crypto():

    search = request.json['results']

    search_name = Cryptocurrency.query.filter(Cryptocurrency.name.ilike(f'{search}%')).all()

    search_symbol = Cryptocurrency.query.filter(Cryptocurrency.symbol.ilike(f'{search}%')).all()

    combined = set(search_name + search_symbol)

    return {'search': [cryptocurrency.to_dict() for cryptocurrency in combined]}
