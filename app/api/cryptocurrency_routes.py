from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Cryptocurrency, db
import requests
from pycoingecko import CoinGeckoAPI
from datetime import datetime, date, timedelta
from .utilities import get_yearly_prices

cg = CoinGeckoAPI()

cryptocurrency_routes = Blueprint('cryptocurrency', __name__)

@cryptocurrency_routes.route('/', methods=['POST'])
def search_crypto():

    search = request.json['results']

    search_name = Cryptocurrency.query.filter(Cryptocurrency.name.ilike(f'{search}%')).all()

    search_symbol = Cryptocurrency.query.filter(Cryptocurrency.symbol.ilike(f'{search}%')).all()

    combined = list(set(search_name + search_symbol))

    combined_sort = sorted(combined, key=lambda k: k.name)

    return {'search': [cryptocurrency.to_dict() for cryptocurrency in combined_sort]}

@cryptocurrency_routes.route('/get')
def get_all_crypto():
    all_cryptos = Cryptocurrency.query.all()
    return {'list': [crypto.to_dict() for crypto in all_cryptos]}

@cryptocurrency_routes.route('/<int:id>')
def getOneCryptocurrency(id):
    date = datetime.today().strftime('%Y-%m-%d')
    crypto = Cryptocurrency.query.get(id)
    d = crypto.to_dict()
    # print(f'\n\n\n{date}\n\n\n')
    prev_date = (datetime.now() - timedelta(weeks=52)).strftime('%Y-%m-%d')
    # print(f'\n\n\n{prev_date}\n\n\n')
    api_url = f'https://finnhub.io/api/v1/company-news?symbol={d["symbol"]}&from={prev_date}&to={date}&token=c65is3aad3i9pn79rgfg'
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
        "USD Coin",
        "Tether",
        "Terra",
        "Solana",
        "SHIBA INU",
        "XRP",
        "Polkadot",
        "Litecoin",
        "Ethereum",
        "Dogecoin",
        "Cardano",
        "Bitcoin",
        "Binance Coin",
        "Avalanche",
    ]

    items = [item.lower() for item in top]

    final = [coin["id"] for coin in coins if coin["name"].lower() in items]

    joined = ", ".join(final)

    price = cg.get_price(ids=joined, vs_currencies="USD")

    all_cryptos = Cryptocurrency.query.order_by(Cryptocurrency.name.asc()).all()

    price_list = [{item: price[item]['usd']} for item in price]

    crypto_list = [crypto.to_dict() for crypto in all_cryptos]

    for crypto in crypto_list:
        one_crypto = Cryptocurrency.query.filter_by(id=crypto['id']).one()
        for item in price_list:
            non_list = list(item.keys())
            if non_list[0] == crypto['gecko']:
                non_list2 = list(item.values())
                one_crypto.price = non_list2[0]
                db.session.commit()

    return {"price": price}

@cryptocurrency_routes.route('/<string:coin>')
def get_history(coin):
    return get_yearly_prices(coin)
