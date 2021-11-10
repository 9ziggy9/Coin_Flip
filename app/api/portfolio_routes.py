from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Portfolio

portfolio_routes = Blueprint('portfolio', __name__)

# Get Portfolios for
@portfolio_routes.route('/<int:user_id>', methods=['GET'])
# @login_required
def portfolio(user_id):
    portfolios = Portfolio.query.filter_by(user_id= user_id).all()
    return {"portfolio": [portfolio.to_dict() for portfolio in portfolios]}

# Create new portfolio
@portfolio_routes.route('/<int:user_id>', methods=['POST'])
# @login_required
def addPortfolio(user_id):
    # if current_user.id is not user_id:
    #     return "Unauthorized"
    new_portfolio = request.json
    portfolios = Portfolio.query.filter_by(user_id=user_id).all()

    single_portfolio = [single for single in portfolios if single.to_dict()["crypto_id"] == new_portfolio["crypto_id"]]

    # check to see if portfolio exists
    if not single_portfolio:
        portfolio = Portfolio(user_id = new_portfolio["user_id"], crypto_id = new_portfolio["crypto_id"], quantity = new_portfolio["quantity"], purchase_price = new_portfolio["purchase_price"])
        db.session.add(portfolio)
        db.session.commit()
    # return portfolios for current user
    portfolios = Portfolio.query.filter_by(user_id= user_id).all()
    return {"portfolio": [portfolio.to_dict() for portfolio in portfolios]}

# Update Porfolio
@portfolio_routes.route('/<int:user_id>', methods=['PUT'])
# @login_required
def update_portfolio(user_id):
    #if current_user.id is not user_id:
    #     return "Unauthorized"
    updated_portfolio = request.json
    single_portfolio = Portfolio.query.filter_by(user_id=user_id, crypto_id=updated_portfolio["crypto_id"]).first()


    # check to see if portfolio exists
    if single_portfolio:
        single_portfolio.quantity = updated_portfolio["quantity"]
        single_portfolio.purchase_price = updated_portfolio["purchase_price"]
        db.session.commit()

    # return portfolios for current user
    portfolios = Portfolio.query.filter_by(user_id= user_id).all()
    return {"portfolio": [portfolio.to_dict() for portfolio in portfolios]}
