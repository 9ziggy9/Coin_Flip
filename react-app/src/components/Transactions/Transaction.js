import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { userPortfolios } from "../../store/portfolio";
import { getUserTransactions } from "../../store/transaction";
import { getAllCrypto } from "../../store/crypto"
import './Transaction.css'
import { stat } from "fs";

const Transactions = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => state.portfolio.portfolio)
    const transactions = useSelector(state => Object.values(state.transaction))
    const cryptos = useSelector(state => state.crypto.list);


    const [cryptoId, setCryptoId] = useState(0);
    const [transactionsArr, setTransactionsArr] = useState();
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        dispatch(userPortfolios(user?.id))
        dispatch(getUserTransactions(user?.id))
    }, [dispatch]);

    useEffect(() => {
        const userTransactionArr = transactions.filter(transaction => transaction.crypto_id == cryptoId);
        setTransactionsArr(userTransactionArr);
    }, [cryptoId, counter])

    const handleClick = (e, i) => {
        e.preventDefault();
        // Reset green border
        document.querySelectorAll(".crypto_name_container").forEach(container => {
            container.style.borderLeft = "0px";
        })
        // Find Crypto ID
        const crypto_id = parseInt(e.target.getAttribute('id'), 10)
        setCryptoId(crypto_id);
        console.log(crypto_id)
        // Find selected container and add green border
        const selectedContainer = document.querySelectorAll(".crypto_name_container")[i]
        selectedContainer.style.borderLeft = '4px solid rgb(0, 200, 5)';
        setCounter(prev => prev +1);
    }


    if (user) {
        return (
            <div className="transaction_main">
                <div className="transaction_container_left">
                    <div className="crypto_title_container">
                        <h2 className="crypto_text">Crypto</h2>
                    </div>
                    <ul className="user_crypto_list">
                        {portfolios ? portfolios.map((portfolio, i) => (
                            <li className="each_crypto_li"key={portfolio.id}>
                                <div className="crypto_name_container" id={portfolio.crypto_id} value={portfolio.id} onClick={(e) => handleClick(e, i)}>
                                    <div className="crypto_name_label_container"id={portfolio.crypto_id} value={portfolio.id}>
                                        <h3 className="crypto_name" id={portfolio.crypto_id}>{cryptos && cryptos.filter(crypto => crypto.id == portfolio.crypto_id)[0].name}</h3>
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
                                <div className="transaction_date_time_container">
                                    <p className="transaction_date_time" style={{fontSize: '12px', fontWeight:'600', color: 'rgb(145, 159, 166)'}}>
                                        {`${transaction.createdAt.split(" ")[2].toUpperCase()}
                                        ${transaction.createdAt.split(" ")[1]}
                                        ・
                                        ${transaction.createdAt.split(" ")[4]}
                                        ${transaction.createdAt.split(" ")[5]}`}
                                    </p>
                                </div>
                                <div className="transaction_details_area">
                                    <div className="transaction_details">
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
                                            {transaction.type === "buy" ?
                                                <h3 className="transaction_details_value" style={{color: 'rgb(0, 200, 5)'}}>{transaction.type.toUpperCase()}</h3> :
                                                <h3 className="transaction_details_value" style={{color: 'rgb(255, 80, 0)'}}>{transaction.type.toUpperCase()}</h3>
                                            }
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
