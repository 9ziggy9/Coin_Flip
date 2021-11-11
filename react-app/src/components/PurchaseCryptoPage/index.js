import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./PurchaseCryptoPage.css"
// import { getOneCryptocurrency, getAllCryptocurrency } from "../../store/purchaseCrypto";
import { getOneCrypto } from "../../store/crypto";
import { changePortfolio } from "../../store/portfolio";


const PurchaseCryptoPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const { pathname } = history.location;
    let historyButtons

    const [transaction, setTransaction] = useState("purchase")
    const [amount, setAmount] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [textColor, setTextColor] = useState("white")

    // useEffect(() => {
    //     historyButtons = document.querySelectorAll(".hisButt")

    //     for (let i = 0; i < historyButtons.length; i++) {
    //         historyButtons[i].addEventListener("click", function(e) {
    //             historyButtons[i].color="orangered";
    //         })
    //     }
    // })

    const colorChange = (history) => {
        document.querySelectorAll(".hisButt").forEach((button) => {
            button.style.color = "white"
        })
        document.getElementById(history).style.color = "orangered"
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newTransaction = {
            userId,
            transaction,
            amount
        }

        await dispatch(changePortfolio(newTransaction))
    }

    const singleCrypto = useSelector(state => {
        return state.crypto?.getOneCrypto;
    })

    const uniqueCryptoId = pathname.split("/")[2]
    let userId;

    useEffect(() => {
        dispatch(getOneCrypto(uniqueCryptoId))
        .then(() => setLoaded(true))
    }, [dispatch, uniqueCryptoId])

    if (loaded) {

    return (
        <div className="pageContainer">
            <div className="cryptoInfoContainer">
                <div className="cryptoName">{singleCrypto[0]?.name}</div>
                <div className="cryptoPrice">${singleCrypto[0]?.price.toLocaleString("en-US")}</div>
            </div>
            <div className="graph">
                plot graph
            </div>
            <div className="graphHistorySelect">
                <div className="graphButtonContainer">
                    <button type="button" className="hisButt" id="1d" onClick={()=>colorChange("1d")} style={{color: textColor}}>1D</button>
                    <button type="button" className="hisButt" id="1w" onClick={()=>colorChange("1w")} style={{color: textColor}}>1W</button>
                    <button type="button" className="hisButt" id="1m" onClick={()=>colorChange("1m")} style={{color: textColor}}>1M</button>
                    <button type="button" className="hisButt" id="1y" onClick={()=>colorChange("1y")} style={{color: textColor}}>1Y</button>
                    <button type="button" className="hisButt" id="all" onClick={()=>colorChange("all")} style={{color: textColor}}>ALL</button>
                </div>
            </div>
            <div className="formContainer">
                <div className="purchaseOrSell" >
                    <input
                        className="purchase"
                        type="radio"
                        value="purchase"
                        name="transaction"
                        checked={transaction === "purchase"}
                        onChange={(e) => setTransaction("purchase")}
                    />
                    Purchase
                    <input
                        className="sell"
                        type="radio"
                        value="sell"
                        name="transaction"
                        checked={transaction === "sell"}
                        onChange={(e) => setTransaction("sell")}
                    />
                    Sell
                    <input
                        className="amount"
                        name="amount"
                        type="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
            </div>
            <div className="about">About</div>
            <hr className="hr"/>
            <div className="aboutContainer">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget sem posuere, cursus magna vitae, dapibus ex. Praesent tincidunt porta auctor. Pellentesque vestibulum dui sed iaculis iaculis. Quisque sed magna mollis, commodo libero ac, tristique eros. Maecenas dapibus orci vitae interdum ultrices. Nam luctus lorem ligula, in iaculis metus scelerisque ac. Donec ac bibendum neque. Vivamus ut turpis vel libero vulputate lacinia sed at est. Pellentesque ultrices efficitur ligula non tristique. Pellentesque porta urna justo, venenatis fermentum dui lobortis vel. Curabitur et aliquet eros. Aenean pulvinar semper augue et mollis.
            </div>

        </div>
    )
}
else {
    return null
}
}

export default PurchaseCryptoPage;
