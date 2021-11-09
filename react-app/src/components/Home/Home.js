import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import { userPortfolios } from "../../store/portfolio";


const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => Object.values(state.portfolio))
    console.log(portfolios)

    useEffect(() => {
        dispatch(userPortfolios(user?.id))
    }, [dispatch]);

    if(user) {
        return (
            <div className="home-main">
                <h1>Welcome to Home Page</h1>
                <ul>
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
            )
        } else {
        return <Redirect to="/" />
    }
}

export default Home
