from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Cryptocurrency
import requests

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

@cryptocurrency_routes.route('/news')
def test_api():
    api_url = 'https://finnhub.io/api/v1/news?category=crypto&token=c65is3aad3i9pn79rgfg'
    res = requests.get(api_url)
    data = res.json()
    return {"news":[news for news in data]}
