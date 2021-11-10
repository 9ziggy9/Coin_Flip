from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Cryptocurrency

cryptocurrency_routes = Blueprint('cryptocurrency', __name__)

@cryptocurrency_routes.route('/', methods=['POST'])
def search_crypto():

    search = request.json['results']

    search_name = Cryptocurrency.query.filter(Cryptocurrency.name.ilike(f'{search}%')).all()

    search_symbol = Cryptocurrency.query.filter(Cryptocurrency.symbol.ilike(f'{search}%')).all()

    combined = set(search_name + search_symbol)

    return {'search': [cryptocurrency.to_dict() for cryptocurrency in combined]}

@cryptocurrency_routes.route('/<int:id>')
def getOneCryptocurrency(id):
    crypto = Cryptocurrency.query.get(id)
    return {"k":crypto.to_dict()}

@cryptocurrency_routes.route('/', methods=["GET"])
def return_all_crypto():
    allCrypto = Cryptocurrency.query.all()
    return {'allCrypto': [crypto.to_dict() for crypto in allCrypto]}
