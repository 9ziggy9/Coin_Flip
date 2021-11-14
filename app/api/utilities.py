from pycoingecko import CoinGeckoAPI
from datetime import timezone
from datetime import datetime

cg = CoinGeckoAPI()

def datetime_to_unix(year, month, day):
    dt = datetime(year, month, day)
    timestamp = (dt - datetime(1970, 1, 1)).total_seconds()
    return timestamp

def unix_to_datetime(unix_time):
    ts = int(unix_time/1000 if len(str(unix_time)) > 10 else unix_time)
    return datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %l:%M%p').lower()
