from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Portfolio

portfolio_routes = Blueprint('portfolio', __name__)


@portfolio_routes.route('/<int:user_id>')
@login_required
def portfolio(user_id):
    portfolio = Portfolio.query.filter_by(user_id= user_id)
    return portfolio.to_dict()


