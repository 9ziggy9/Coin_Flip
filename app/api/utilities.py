from pycoingecko import CoinGeckoAPI
from datetime import timezone
from datetime import datetime

cg = CoinGeckoAPI()

def datetime_to_unix(year, month, day):
    dt = datetime(year, month, day)
    timestamp = (dt - datetime(1970, 1, 1)).total_seconds()
    return timestamp

 def unix_to_datetime(unix_time)
     ts = int(unix_time/1000 if
     return datetime.utcfromtime
