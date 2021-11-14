import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { userPortfolios } from "../../store/portfolio";
import { SimPlot, MarketPlot } from "../Plot/Plot";
import { Market, Simulation, log_normal } from '../../utilities/statistics';
import News from "../News/News";
import Watchlist from "../Watchlist/Watchlist";
import "./Home.css";

const Home = () => {
  const [test, setTest] = useState();
  const [test2, setTest2] = useState();

  const user = useSelector((state) => state.session.user);
  const cryptos = useSelector((state) => state.crypto.list);
  const portfolios = useSelector((state) => Object.values(state.portfolio));
  const [coin, setCoin] = useState("fakecoin");
  const cryptoNames = new Set(cryptos.map((c) => c.name.toLowerCase()));
  let [start_price] = cryptos.filter((p) => p.gecko === coin);
  if (!cryptoNames.has(coin)) start_price = { price: 0 };
  const [price, setPrice] = useState(start_price.price);

  const data = async (coin) => {
    const res = await fetch("/api/cryptocurrencies/prices");
    const d = await res.json();
    setPrice(d.price[coin].usd);
  };

  //NOTE: API calls seemed to have been stacking up, 8 seconds is an additional
  // security measure. Simulating prices still seems relevant.

  // useEffect(() => {const pInterval = setInterval(() => data(coin), 8000);
  //                  return () => clearInterval(pInterval)}, []);

  // const [entry] = crypto_list.filter(b => b.gecko === 'bitcoin')
  // const price = entry.price
  const [fn, setFunction] = useState('log_normal');
  const [mu, setMean] = useState(1000);
  const [sigma, setDeviation] = useState(100);
  const [X, setDomain] = useState([]);
  const [Y, setRange] = useState([]);

  useEffect (() => {
    if (cryptoNames.has(coin)) {
      const {domain, range} = Market.initialize(coin,30);
      setDomain(domain);
      setRange(range);
    } else {
      if (fn === 'log_normal') {
        const {domain, range} = Simulation.initialize(50, log_normal,mu,sigma)
        setDomain(domain);
        setRange(range);
      }
    }
  }, []);

  if (user) {
    return (
      <>
        <div className="home_main">
          <div className="home_container_left">
            <div className="total_cash_container">
              <div className="cash_container">
                <div className="coin-title">{coin}</div>
                <div className="cash">{`$${price}`}</div>
              </div>
              <div className="today_tracker">
                <h5 className="today_values">$0.00 (0.00%)</h5>
                <h5 className="today_label">Today</h5>
              </div>
              <div className="after_hours_tracker">
                <h5 className="after_hours_values">$0.00 (0.00%)</h5>
                <h5 className="after_hours_label">After Hours</h5>
              </div>
            </div>
            <div className="porfolio_chart_container">
              {cryptoNames.has(coin) ? (
                <MarketPlot coin={coin} X={X} Y={Y}
                            setRange={setRange} setDomain={setDomain}/>
              ) : (
                <SimPlot fn={fn} mu={mu} sigma={sigma} X={X} Y={Y}
                  setRange={setRange} setDomain={setDomain}/>
              )}
            </div>
            <div className="buying_power_container">
              <div className="buying_power_label_container">
                <h4 className="buying_power_label">Buying Power</h4>
              </div>
              <div className="buying_power">
                <h4 className="buying_power_label">
                  {`$${user.cash.toLocaleString()}`}
                </h4>
              </div>
            </div>
            <div className="add_funds_container">
              <div className="add_funds_label_container">
                <h5 className="add_funds_label">Fund Your Account</h5>
              </div>
              <div className="add_funds_description">
                <p className="funds_description">
                  Your bank account is ready! Fund your Robinhood account to
                  begin trading.
                </p>
              </div>
              <button type="button" className="add_funds_button">
                <h4 className="add_funds_button_text">Add Funds</h4>
              </button>
            </div>
            <div className="add_funds_static_nav">
              <p>
                <i className="arrow_left">⌃</i>
              </p>
              <p className="add_funds_page_counter">1 of 1</p>
              <p>
                <i className="arrow_right">⌃</i>
              </p>
            </div>
            <div className="news_container">
              <News />
            </div>
          </div>
          <div className="home_container_right">
            <Watchlist />
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const body = {
              oldpassword: test,
              newpassword: test2,
            };
            await fetch("/api/auth/password", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: body,
            });
          }}
        >
          <input value={test} onChange={(e) => setTest(e.target.value)} />
          <input value={test2} onChange={(e) => setTest2(e.target.value)} />
          <button>Submit</button>
        </form>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Home;
