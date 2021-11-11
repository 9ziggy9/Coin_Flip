from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Watchlist

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/user/<int:user_id>')
def get_watchlist(user_id):
    watchlist = Watchlist.query.filter_by(user_id=user_id).all()

    return {'watchlists': [item.to_dict() for item in watchlist]}

# @watchlist_routes.route('/user/<int:user_id>', methods=['POST'])
# def new_watchlist(user_id):

#     data =

@watchlist_routes.route('/<int:watchlist_id>')
def populate_watchlist(watchlist_id):
    watchlist = Watchlist_Crypto.query.filter_by(watchlist_id=watchlist_id).all()

    return {'cryptos': [item.to_dict()["crypto_id"] for item in watchlist]}
