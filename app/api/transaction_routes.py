from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Transaction

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
# @login_required
def transactions():
    transactions = Transaction.query.all()
    return {'transactions': [transaction.to_dict() for transaction in transactions]}

# Get a list of current user transactions
@transaction_routes.route('/<int:user_id>')
# @login_required
def user_transactions(user_id):
    if current_user.id != user_id:
        return "bruh, what you do?"
    transactions = Transaction.query.filter_by(user_id=user_id)
    return {'transactions': [transaction.to_dict() for transaction in transactions]}

# Create a new transaction
@transaction_routes.route('/', methods=['POST'])
# @login_required
def create_transaction():
    new_transaction = request.json
    # print(f'=========================={new_transaction}')
    transaction = Transaction(crypto_id = new_transaction["crypto_id"], user_id = new_transaction["user_id"], type = new_transaction["type"], price = new_transaction["price"], quantity = new_transaction["quantity"], createdAt = new_transaction["createdAt"])
    db.session.add(transaction)
    db.session.commit()

    transactions = Transaction.query.filter_by(user_id=new_transaction["user_id"])
    return {'transactions': [transaction.to_dict() for transaction in transactions]}
