import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import { userPortfolios } from "../../store/portfolio";

const Transactions = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => Object.values(state.portfolio))

    useEffect(() => {
        dispatch(userPortfolios(user?.id))
    }, [dispatch]);

    if (user) {
        return (
            <div className="transaction_main">
                <h1>Welcome to the Transactions Page</h1>
                <div className="transaction_container_left">
                    <div className="crypto_title_container">
                        <h2 className="crypto_text">Crypto</h2>
                    </div>
                    <ul className="user_crypto_list">
                    
                    </ul>
                </div>
                <div className="transaction_container_right"></div>
            </div>
        )
    }

}

export default Transactions
