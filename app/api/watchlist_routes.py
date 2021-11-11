from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Watchlist

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/<int:user_id>')
def get_watchlist(user_id):
    watchlist = Watchlist.query.filter_by(user_id=user_id).all()

    return {'watchlists': [item for item in watchlist]}
