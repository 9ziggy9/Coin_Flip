from app.models import db, Cryptocurrency
from datetime import datetime
from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()

# Adds crypto seeds
def seed_cryptocurrency():
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

    complete = [coin for coin in coins if coin["name"].lower() in items]

    joined = ", ".join(final)

    price = cg.get_price(ids=joined, vs_currencies="USD")

    for crypto in complete:
        i = Cryptocurrency(name=crypto["name"], symbol=crypto["symbol"].upper(), price=price[crypto["id"]]["usd"], history="none", gecko=crypto["id"])
        db.session.add(i)
        db.session.commit()


def undo_cryptocurrency():
    db.session.execute('TRUNCATE cryptocurrency RESTART IDENTITY CASCADE;')
    db.session.commit()
