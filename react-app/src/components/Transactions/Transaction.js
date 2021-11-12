import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { userPortfolios } from "../../store/portfolio";
import { getUserTransactions } from "../../store/transaction";
import { getAllCrypto } from "../../store/crypto"
import './Transaction.css'

const Transactions = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => Object.values(state.portfolio))
    const transactions = useSelector(state => Object.values(state.transaction))
    // const cryptos = useSelector(state => Object.values(state.crypto))

    const [cryptoId, setCryptoId] = useState(0);
    const [transactionsArr, setTransactionsArr] = useState();

    useEffect(() => {
        dispatch(userPortfolios(user?.id))
        dispatch(getUserTransactions(user?.id))
        // dispatch(getAllCrypto());
    }, [dispatch]);

    useEffect(() => {
        const userTransactionArr = transactions.filter(transaction => transaction.crypto_id == cryptoId);
        setTransactionsArr(userTransactionArr);
    }, [cryptoId])


    if (user) {
        return (
            <div className="transaction_main">
                <div className="transaction_container_left">
                    <div className="crypto_title_container">
                        <h2 className="crypto_text">Crypto</h2>
                    </div>
                    <ul className="user_crypto_list">
                        {portfolios ? portfolios.map(portfolio => (
                            <li className="each_crypto_li"key={portfolio.id}>
                                <div className="crypto_name_container" id={portfolio.crypto_id} value={portfolio.id} onClick={(e) => setCryptoId(portfolio.crypto_id)}>
                                    <div className="crypto_name_label_container" value={portfolio.id}>
                                        <h3 className="crypto_name">Crypto {portfolio.crypto_id}</h3>
                                    </div>
                                </div>
                            </li>
                        )): ""}
                    </ul>
                </div>
                <div className="transaction_container_right">
                    <div className="transaction_title_container">
                        <p className="transaction_title">Transaction</p>
                    </div>
                    <ul className="transaction_list_container">
                        {transactionsArr && transactionsArr?.map(transaction => (
                            <li className="transaction_li"key={transaction.id}>
                                <div className="transaction_details_area">
                                    <div className="transaction_details_container">
                                        <div className="transaction_details_container">
                                            <h5 className="transaction_details_label">Transaction ID</h5>
                                            <h3 className="transaction_details_value">{transaction.id}</h3>
                                        </div>
                                    </div>
                                    <div className="transaction_details">
                                        <div className="transaction_details_container">
                                            <h5 className="transaction_details_label">Price</h5>
                                            <h3 className="transaction_details_value">{`\$${transaction.price}`}</h3>
                                        </div>
                                    </div>
                                    <div className="transaction_details">
                                        <div className="transaction_details_container">
                                            <h5 className="transaction_details_label">Qty.</h5>
                                            <h3 className="transaction_details_value">{transaction.quantity}</h3>
                                        </div>
                                    </div>
                                    <div className="transaction_details">
                                        <div className="transaction_details_container">
                                            <h5 className="transaction_details_label">Transaction Type</h5>
                                            <h3 className="transaction_details_value">{transaction.type.toUpperCase()}</h3>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

}

export default Transactions
