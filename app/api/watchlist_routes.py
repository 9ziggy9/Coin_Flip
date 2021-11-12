from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Watchlist, Cryptocurrency

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/user/<int:user_id>')
def get_watchlist(user_id):
    watchlist = Watchlist.query.filter_by(user_id=user_id).all()

    return {'watchlists': [item.to_dict() for item in watchlist]}

@watchlist_routes.route('/new/<int:user_id>', methods=['POST'])
def new_watchlist(user_id):
    data = request.json

    watchlist = Watchlist(name=data['name'], user_id=data['user_id'])
    db.session.add(watchlist)
    db.session.commit()

    return {'msg': 'ok'}

@watchlist_routes.route('/add/<int:watchlist_id>', methods=['PUT'])
def add_crypto(watchlist_id):
    crypto_id = int(request.json['crypto_id'])
    user_id = int(request.json['user_id'])

    watchlist = Watchlist.query.filter_by(id=watchlist_id).first()

    crypto = Cryptocurrency.query.filter_by(id=crypto_id).first()

    watchlist.cryptocurrency.append(crypto)
    db.session.add(watchlist)
    db.session.commit()

    return {'msg': 'ok'}

@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
def remove_list(watchlist_id):
    Watchlist.query.filter_by(id=watchlist_id).delete()

    db.session.commit()

    return {'msg': 'ok'}
