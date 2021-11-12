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
    const cryptos = useSelector(state => Object.values(state.crypto))

    const [cryptoId, setCryptoId] = useState(0);
    const [transactionsArr, setTransactionsArr] = useState();

    useEffect(() => {
        dispatch(userPortfolios(user?.id))
        dispatch(getUserTransactions(user?.id))
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
                            <li key={portfolio.id}>
                                <div className="crypto_name_container" id={portfolio.crypto_id} value={portfolio.id} onClick={(e) => setCryptoId(portfolio.crypto_id)}>
                                    <h3 className="crypto_name_text" value={portfolio.id}>{portfolio.crypto_id}</h3>
                                </div>
                            </li>
                        )): ""}
                    </ul>
                </div>
                <div className="transaction_container_right">
                    <ul>
                        {transactionsArr && transactionsArr?.map(transaction => (
                            <li key={transaction.id}>
                                <div>
                                    {transaction.id}
                                </div>
                                <div>{transaction.price}</div>
                                <div>{transaction.quantity}</div>
                                <div>{transaction.type}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

}

export default Transactions
