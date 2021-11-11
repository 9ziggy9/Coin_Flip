from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Cryptocurrency
import requests
from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()

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
    d = crypto.to_dict()
    api_url = f'https://finnhub.io/api/v1/company-news?symbol={d["symbol"]}&from=2021-09-01&to=2021-09-09&token=c65is3aad3i9pn79rgfg'
    res = requests.get(api_url)
    data = res.json()

    return {"k":[crypto.to_dict()], "news": [news for news in data]}

@cryptocurrency_routes.route('/news')
def test_api():
    api_url = 'https://finnhub.io/api/v1/news?category=crypto&token=c65is3aad3i9pn79rgfg'
    res = requests.get(api_url)
    data = res.json()
    return {"news":[news for news in data]}

@cryptocurrency_routes.route('/prices')
def get_coins():

    coins = cg.get_coins_list()

    top = [
    "Bitcoin",
    "Ethereum",
    "Binance Coin",
    "Cardano",
    "Tether",
    "Solana",
    "XRP",
    "Polkadot",
    "Dogecoin",
    "USD Coin",
    "SHIBA INU",
    "Terra",
    "Litecoin",
    "Avalanche"
    ]

    items = [item.lower() for item in top]

    final = [coin["id"] for coin in coins if coin["name"].lower() in items]

    joined = ", ".join(final)

    price = cg.get_price(ids=joined, vs_currencies="USD")

    return {"price": price}
