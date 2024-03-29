import { useEffect, useState, forceUpdate } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory  } from "react-router-dom";
import "./PurchaseCryptoPage.css";
import { useParams } from "react-router";
import {MarketPlot} from "../Plot/Plot";
// import { getOneCryptocurrency, getAllCryptocurrency } from "../../store/purchaseCrypto";
import { getOneCrypto } from "../../store/crypto";
import {
  userPortfolios,
  changePortfolio,
  newPortfolio,
} from "../../store/portfolio";
import { createTransaction } from "../../store/transaction";
import { addFunds } from "../../store/session";
//used for alert
import { confirm } from "react-confirm-box";

import AddToList from "../AddToListModal/AddToList";
import CryptoNews from "./CryptoNews";
import Loading from "../Loading/Loading";

const PurchaseCryptoPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();
  // const { pathname } = history.location;
  // const uniqueCryptoId = parseInt(pathname.split("/")[2])
  const [uniqueCryptoId, setUniqueCryptoId] = useState();
  const { id } = useParams();
  let totalValue;
  let totalValueString;

  const [transaction, setTransaction] = useState("buy");
  let [amount, setAmount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);
  const [hist, setHist] = useState([]);

  const completePortfolio = useSelector(state => state.portfolio.portfolio)

  let singleCrypto;


  const userId = currentUser?.id;

  useEffect(() => {
    if (singleCrypto) setPrice(singleCrypto[0]?.price);
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(userPortfolios(userId));
    }
  }, [dispatch, userId]);

  const colorChange = (history) => {
    document.querySelectorAll(".hisButt").forEach((button) => {
      button.style.color = "white";
    });
    document.getElementById(history).style.color = "orangered";
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const options = {
      labels: {
        confirmable: `Confirm`,
        cancellable: "Cancel",
      },
    };

    let coinSingularOrPlural;
    amount = parseInt(amount);

    if (amount === 1) {
      coinSingularOrPlural = "coin";
    } else {
      coinSingularOrPlural = "coins";
    }

    const result = await confirm(
      `Please confirm your ${transaction} of ${amount} ${
        singleCrypto[0]?.name
      } ${coinSingularOrPlural}. Estimated value: $${totalValue?.toLocaleString(
        "en-US"
      )} `,
      options
    );

    if (result) {
      let hasPortfolio = false;
      let portfolioId;
      let currentAmount = 0;
      let newCashValue = 0;

      for (const portfolio in completePortfolio) {
        if (completePortfolio[portfolio].crypto_id === uniqueCryptoId) {
          portfolioId = completePortfolio[portfolio].id;
          currentAmount = completePortfolio[portfolio].quantity;
          hasPortfolio = true;
        }
      }


      if (transaction === "sell") {
        amount = amount * -1;
        newCashValue += totalValue;
      } else if (transaction === "buy") {
        newCashValue -= totalValue;
      }

      amount = currentAmount + amount;

      const newTransaction = {
        userId,
        cryptoId: uniqueCryptoId,
        quantity: amount,
        purchasePrice: singleCrypto[0]?.price,
      };

      const creatingTransaction = {
        cryptoId: +uniqueCryptoId,
        userId: +userId,
        type: transaction.toString(),
        price: +singleCrypto[0]?.price,
        quantity: +amount,
      };

      setAmount(0)

      if (hasPortfolio) {
        await dispatch(changePortfolio(newTransaction));
      } else {
        await dispatch(newPortfolio(newTransaction));
      }

      await dispatch(addFunds(newCashValue))
      await dispatch(createTransaction(creatingTransaction));
      history.go(0)
    } else {
    }
  };

  singleCrypto = useSelector((state) => {
    return state.crypto?.getOneCrypto;
  });

  const totalValueOfCoins = (amount) => {
    if (singleCrypto) {
      return (singleCrypto[0]?.price * amount)
    }
  }

  if (singleCrypto && amount) {
    totalValue = totalValueOfCoins(amount);
    if (isNaN(totalValue)) {
        totalValueString = "";
    } else if (transaction === "buy") {
      totalValueString = `Estimated Cost: ${
        totalValue > 100000000000000.0
          ? `Over $100,000,000,000,000`
          : `$${totalValue.toLocaleString("en-us")}`
      }`;
    } else if (transaction === "sell") {
        totalValueString = `Estimated Value: $${totalValue.toLocaleString("en-us")}`;
    }
  }

  useEffect(() => {
      setUniqueCryptoId(+id);
      dispatch(getOneCrypto(+id)).then(() => setLoaded(true));
  }, [dispatch, id]);

  const [cryptoPort, setCryptoPort] = useState(0);

  useEffect(() => {
      let a = completePortfolio?.filter(c => c.crypto_id === +uniqueCryptoId)
      setCryptoPort(a)
  },[completePortfolio]);

  useEffect(() => {
    const errors = [];
    totalValue = totalValueOfCoins(amount);
    let currentAmount;

    if (isNaN(amount) || amount === "") {
        errors.push("Please enter a number");
    }

    if (amount < 0) {
        errors.push("Please enter a value greater than zero");
    }

    if (transaction === "buy" && (totalValue > currentUser?.cash)) {
        errors.push("Not enough buying power")
    }

    if (transaction === "sell" && ((cryptoPort[0]?.quantity < amount) || !cryptoPort[0]?.quantity || cryptoPort[0]?.quantity === 0)) {

        errors.push("Not enough coins")
    }

      setErrors(errors);
  }, [amount, transaction, totalValue, completePortfolio]);


  useEffect(() => {
    setUniqueCryptoId(+id);
    dispatch(getOneCrypto(+id)).then(() => setLoaded(true));
  }, [dispatch, id]);

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  if (loaded) {
    return (
      <div className="pageContainer">
        <div className="cryptoInfoContainer">
          <div className="cryptoName">{capitalizeFirstLetter(singleCrypto[0]?.name)}</div>
          <div className="cryptoPrice">
            ${singleCrypto[0]?.price > 1 ? singleCrypto[0]?.price.toLocaleString() : singleCrypto[0]?.price}
          </div>
        </div>
        <div className="graph">
          <MarketPlot coin={singleCrypto[0]?.gecko} setHist={setHist}/>
        </div>
        {/* <div className="graphHistorySelect"> */}
        {/*   {/\* <div className="graphButtonContainer"> *\/} */}
        {/*   {/\*   <button *\/} */}
        {/*   {/\*     type="button" *\/} */}
        {/*   {/\*     className="hisButt" *\/} */}
        {/*   {/\*     id="1d" *\/} */}
        {/*   {/\*     onClick={() => colorChange("1d")} *\/} */}
        {/*   {/\*     style={{ color: textColor }} *\/} */}
        {/*   {/\*   > *\/} */}
        {/*   {/\*     1D *\/} */}
        {/*   {/\*   </button> *\/} */}
        {/*   {/\*   <button *\/} */}
        {/*   {/\*     type="button" *\/} */}
        {/*   {/\*     className="hisButt" *\/} */}
        {/*   {/\*     id="1w" *\/} */}
        {/*   {/\*     onClick={() => colorChange("1w")} *\/} */}
        {/*   {/\*     style={{ color: textColor }} *\/} */}
        {/*   {/\*   > *\/} */}
        {/*   {/\*     1W *\/} */}
        {/*   {/\*   </button> *\/} */}
        {/*   {/\*   <button *\/} */}
        {/*   {/\*     type="button" *\/} */}
        {/*   {/\*     className="hisButt" *\/} */}
        {/*   {/\*     id="1m" *\/} */}
        {/*   {/\*     onClick={() => colorChange("1m")} *\/} */}
        {/*   {/\*     style={{ color: textColor }} *\/} */}
        {/*   {/\*   > *\/} */}
        {/*   {/\*     1M *\/} */}
        {/*   {/\*   </button> *\/} */}
        {/*   {/\*   <button *\/} */}
        {/*   {/\*     type="button" *\/} */}
        {/*   {/\*     className="hisButt" *\/} */}
        {/*   {/\*     id="1y" *\/} */}
        {/*   {/\*     onClick={() => colorChange("1y")} *\/} */}
        {/*   {/\*     style={{ color: textColor }} *\/} */}
        {/*   {/\*   > *\/} */}
        {/*   {/\*     1Y *\/} */}
        {/*   {/\*   </button> *\/} */}
        {/*   {/\*   <button *\/} */}
        {/*   {/\*     type="button" *\/} */}
        {/*   {/\*     className="hisButt" *\/} */}
        {/*   {/\*     id="all" *\/} */}
        {/*   {/\*     onClick={() => colorChange("all")} *\/} */}
        {/*   {/\*     style={{ color: textColor }} *\/} */}
        {/*   {/\*   > *\/} */}
        {/*   {/\*     ALL *\/} */}
        {/*   {/\*   </button> *\/} */}
        {/*   {/\* </div> *\/} */}
        {/* </div> */}
        <div className="formContainer">
          <form onSubmit={onSubmit} className="buy-form">
            <div className="purchaseOrSell">
              <input
                className="buy"
                type="radio"
                value="buy"
                name="transaction"
                checked={transaction === "buy"}
                onChange={(e) => setTransaction("buy")}
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
                placeholder="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="estValue">{totalValueString}</div>
            </div>
            <div className="purchasePower">
                Buying Power: ${currentUser?.cash.toLocaleString("en-us")}
            </div>
            <div className="subButtContainer">
              <button
                disabled={errors.length > 0}
                type="submit"
                className="submitButt"
              >
                {" "}
                Submit{" "}
              </button>
              <ul className="errors">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          </form>
            <AddToList cryptoId={id} />
        </div>
        <div className="aboutContainer">
          <CryptoNews crypto={singleCrypto[0]} />
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default PurchaseCryptoPage;
