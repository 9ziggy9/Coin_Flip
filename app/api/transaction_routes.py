from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Transaction

transaction_routes = Blueprint('transactions', __name__)


@transaction_routes.route('/')
@login_required
def transactions():
    transactions = Transaction.query.all()
    return {'transactions': [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/<int:user_id>')
@login_required
def user_transaction(user_id):
    if current_user.id != user_id:
        return "bruh, what you do?"
    transactions = Transaction.query.filter_by(user_id=user_id)
    return {'transactions': [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/test')
@login_required
def test_post(methods=['POST']):
    return "HELLO FROM POST"
