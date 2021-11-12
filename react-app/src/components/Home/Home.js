import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import { userPortfolios } from "../../store/portfolio";
import { getPrice } from "../../store/crypto";
import Plot from "../Plot/Plot"
import News from "../News/News";
import Watchlist from "../Watchlist/Watchlist";
import "./Home.css"


const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const crypto_list = useSelector(state => state.crypto.list)
    const [indicator, setIndicator] = useState('indicator1');
    const portfolios = useSelector(state => Object.values(state.portfolio))

    // This is important, if user is returning to /home and not entering
    // authentication, crypto_list needs to be loaded back into state.
    useEffect(() => {
    }, []);

    useEffect(() => {
        const intervalPointer = setInterval(() => {
            // NOTE: I think the issue is that perhaps one query that results in the
            // the join table we are returning is counting as more than one?
            // console.log(`Request number ${n * 14}`)
            // (async () => await dispatch(getPrice()))();
            //
            // NOTE: Debug proof of concept
            if (indicator === 'indicator1') setIndicator('indicator2')
            else setIndicator('indicator1')
            //
            // console.log(crypto_list)
        }, 4000)
        return () => clearInterval(intervalPointer)
    },[indicator])

    if (user) {
        return (
            <>
            <div className="home_main">
              {/* total_cash_container */}
                <div className="home_container_left">
                  <div className={indicator}>
                        <div className="cash_container">
                            <h2 className="cash">{`$${user.cash.toLocaleString()}`}</h2>
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
                                {`$${user.cash.toLocaleString()}`}
                            </h4>
                        </div>
                    </div>
                    <div className="add_funds_container">
                        <div className="add_funds_label_container">
                            <h5 className="add_funds_label">Fund Your Account</h5>
                        </div>
                        <div className="add_funds_description">
                            <p className="funds_description">Your bank account is ready! Fund your Robinhood account to begin trading.</p>
                        </div>
                        <button type="button" className="add_funds_button">
                            <h4 className="add_funds_button_text">Add Funds</h4>
                        </button>
                    </div>
                        <div className="add_funds_static_nav">
                            <p><i className="arrow_left">⌃</i></p>
                            <p className="add_funds_page_counter">1 of 1</p>
                            <p><i className="arrow_right">⌃</i></p>
                        </div>
                    <div className="news_container">
                            <News />
                    </div>
                </div>
                <div className="home_container_right">
                    <Watchlist />
                </div>
            </div>
            </>
            )
        } else {
        return <Redirect to="/" />
    }
}

export default Home
