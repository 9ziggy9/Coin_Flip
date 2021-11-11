import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import { userPortfolios } from "../../store/portfolio";
import Plot from "../Plot/Plot"
import News from "../News/News";
import "./Home.css"


const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => Object.values(state.portfolio))
    console.log(user.cash)

    useEffect(() => {
        dispatch(userPortfolios(user?.id))
    }, [dispatch]);

    if (user) {
        return (
            <div className="home_main">
                <div className="home_container_left">
                    <div className="total_cash_container">
                        <div className="cash_container">
                            <h2 className="cash">{`$${user.cash}`}</h2>
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
                          <Plot />
                    </div>
                    <div className="buying_power_container">
                        <div className="buying_power_label_container">
                            <h4 className="buying_power_label">
                                Buying Power
                            </h4>
                        </div>
                        <div className="buying_power">
                            <h4 className="buying_power_label">
                                {`$${user.cash}`}
                            </h4>
                        </div>
                    </div>
                    <div className="add_funds_container">
                        <div className="add_funds_label_container">
                            <h5 className="add_funds_label">Fund Your Account</h5>
                        </div>
                        <div className=""></div>
                    </div>
                    <div className="news_container">
                        <h2>News</h2>
                        <News />
                    </div>
                </div>
                <div className="home_container_right">
                    <ul className="portfolio_list">
                        {portfolios ? portfolios.map(portfolio =>(

                            <li className={`${portfolio.id}`}>
                                <div className="crypto_id">
                                    <h3>
                                        {`Crypto ID ${portfolio.crypto_id}`}
                                    </h3>
                                </div>
                                <div className="purchase_price_container">
                                    <h3>

                                        {`Purchased @ $${portfolio.purchase_price}`}
                                    </h3>
                                </div>
                                <div className="quantity_container">
                                    <h3>

                                        {`Quantity ${portfolio.quantity}`}
                                    </h3>
                                </div>
                            </li>
                        )): ""}
                    </ul>
                </div>
            </div>
            )
        } else {
        return <Redirect to="/" />
    }
}

export default Home
