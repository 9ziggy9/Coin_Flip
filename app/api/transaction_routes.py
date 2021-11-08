from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Transaction

transaction_routes = Blueprint('transactions', __name__)


@transaction_routes.route('/')
@login_required
def transactions():
    transactions = Transaction.query.all()
    return {'transactions': [transaction.to_dict() for transaction in transactions]}
