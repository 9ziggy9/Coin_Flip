import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import News from "../News/News";
import Watchlist from "../Watchlist/Watchlist";
import AddFundsModal from "../AddFundsModal/AddFundsModal";
import "./Home.css";
import {PortPlot} from "../Plot/Plot";

const Home = () => {
  const user = useSelector((state) => state.session.user);
  const cryptos = useSelector((state) => state.crypto.list);
  const cryptoNames = new Set(cryptos.map((c) => c.name.toLowerCase()));

  // const data = async (coin) => {
  //   const res = await fetch("/api/cryptocurrencies/prices");
  //   const d = await res.json();
  //   setPrice(d.price[coin].usd);
  // };

  const [coin, setCoin] = useState("fakecoin");
  const [price, setPrice] = useState(0);
  const [hist, setHist] = useState([])

  useEffect(() => {
    let [start_price] = cryptos.filter((p) => p.gecko === coin);
    if (!cryptoNames.has(coin)) start_price = { price: 0 };
    setPrice(start_price.price);
  }, [coin])

  if (user) {
    return (
      <>
        <div className="home_main">
          <div className="home_container_left">
            <div className="total_cash_container">
              <div className="tc-greeting">{`Welcome back, ${user.username}`}</div>
              <div className="tc-assets">{`$75,900`}</div>
              <div className="tc-assets-label">total assets:</div>
              <div className="tc-24-a">hello</div>
              <div className="tc-24-p">hello</div>
              <div className="tc-24-label">hello</div>
              <div className="tc-m-a">hello</div>
              <div className="tc-m-p">hello</div>
              <div className="tc-m-label">hello</div>
              <div className="tc-y-a">hello</div>
              <div className="tc-y-p">hello</div>
              <div className="tc-y-label">hello</div>
              <div className="tc-cash-out-label">hello</div>
              <div className="tc-cash-out-a">hello</div>
            </div>
            <div className="porfolio_chart_container">
              <PortPlot />
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
                  Your fake account is ready! Fund your CoinFlip account to
                  begin trading.
                </p>
              </div>
              <AddFundsModal />
            </div>
            <div className="add_funds_static_nav">
              <p>
                <i className="arrow_left">{"<"}</i>
              </p>
              <p className="add_funds_page_counter">1 of 1</p>
              <p>
                <i className="arrow_right">{">"}</i>
              </p>
            </div>
            <div className="news_container">
            <div className="news_title">News</div>
              <News />
            </div>
          </div>
          <div className="home_container_right">
            <Watchlist hist={hist} />
          </div>
        </div>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Home;
