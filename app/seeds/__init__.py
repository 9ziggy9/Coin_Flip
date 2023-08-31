from flask.cli import AppGroup
from .users import seed_users, undo_users
from .transactions import seed_transactions, undo_transactions
from .cryptocurrency import seed_cryptocurrency, undo_cryptocurrency
from .portfolio import seed_portfolios, undo_portfolios
from app.models.db import db, environment, SCHEMA


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.cryptocurrency RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolio RESTART IDENTITY CASCADE;")
        db.session.commit()
    seed_users()
    seed_cryptocurrency()
    seed_transactions()
    seed_portfolios()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_cryptocurrency()
    undo_transactions()
    undo_portfolios()
    # Add other undo functions here

# When reseeding, make sure to flask seed undo before flask seed all
