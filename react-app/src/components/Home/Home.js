import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import News from "../News/News";
import Watchlist from "../Watchlist/Watchlist";
import AddFundsModal from "../AddFundsModal/AddFundsModal";
import "./Home.css";
import {PortPlot} from "../Plot/Plot";
import { userPortfolios } from "../../store/portfolio";
import { getUserTransactions } from "../../store/transaction";
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cryptos = useSelector((state) => state.crypto.list);
  const cryptoNames = new Set(cryptos.map((c) => c.name.toLowerCase()));
  const portfolios = useSelector((state) => state.portfolio.portfolio);

  const fetchPrices = async () => {
    await fetch("/api/cryptocurrencies/prices");
  };

  useEffect(() => {
    fetchPrices();
    dispatch(userPortfolios(user?.id));
    dispatch(getUserTransactions(user?.id));
  }, [dispatch]);

  const assets = [];
  for(let i = 0; i < portfolios?.length; i++) {
    for(let j = 0; j < cryptos?.length; j++) {
      if(portfolios[i].crypto_id === cryptos[j].id)
        assets.push({
          'purchase_price': portfolios[i].purchase_price,
          'gecko': cryptos[j].gecko,
          'quantity': portfolios[i].quantity,
          'initial_investment': portfolios[i].purchase_price *
                                portfolios[i].quantity
        })
    }
  }

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
              <div className="tc-24-a">{`$251.25 (1.52%) 24h`}</div>
              <div className="tc-24-p"></div>
              <div className="tc-24-label"></div>
              <div className="tc-m-a">{`4141.25 (20.41%) monthly`}</div>
              <div className="tc-m-p"></div>
              <div className="tc-m-label"></div>
              <div className="tc-cash-out-label"></div>
              <div className="tc-cash-out-a"></div>
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
