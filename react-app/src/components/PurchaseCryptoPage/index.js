import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./PurchaseCryptoPage.css";
import { useParams } from "react-router";
// import { getOneCryptocurrency, getAllCryptocurrency } from "../../store/purchaseCrypto";
import { getOneCrypto } from "../../store/crypto";
import {
  userPortfolios,
  changePortfolio,
  newPortfolio,
} from "../../store/portfolio";
import { createTransaction } from "../../store/transaction";
import AlertPopup from "../popup";

//used for alert
import { confirm } from "react-confirm-box";

import AddToList from "../AddToListModal/AddToList";
import { getUserList } from "../../store/watchlist";
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
  let cryptoPortfolio;
  let ports;
  let totalValue;
  let totalValueString;

  const [transaction, setTransaction] = useState("buy");
  let [amount, setAmount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);
  let singleCrypto;

  const userId = currentUser?.id;

  useEffect(() => {
    if (singleCrypto) setPrice(singleCrypto[0]?.price);
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(userPortfolios(userId));
    }
  }, [dispatch]);

  ports = useSelector((state) => state.portfolio);
  console.log(ports);

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
      } ${coinSingularOrPlural}. Estimated value: $${totalValue.toLocaleString(
        "en-US"
      )} `,
      options
    );

    if (result) {
      let hasPortfolio = false;
      let portfolioId;
      let currentAmount = 0;

      for (const portfolio in ports) {
        if (ports[portfolio].crypto_id === uniqueCryptoId) {
          portfolioId = ports[portfolio].id;
          currentAmount = ports[portfolio].quantity;
          hasPortfolio = true;
        }
      }

      if (transaction === "sell") {
        amount = amount * -1;
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

      if (hasPortfolio) {
        await dispatch(changePortfolio(newTransaction));
        await dispatch(createTransaction(creatingTransaction));
      } else {
        await dispatch(newPortfolio(newTransaction));
        await dispatch(createTransaction(creatingTransaction));
      }
    } else {
      console.log("You click No!");
    }
  };

  singleCrypto = useSelector((state) => {
    return state.crypto?.getOneCrypto;
  });

  if (singleCrypto && amount) {
    totalValue = (singleCrypto[0].price * amount).toLocaleString("en-US");
    if (transaction === "sell") {
      totalValueString = `Estimated Value: $${totalValue}`;
    } else if (transaction === "buy") {
      totalValueString = `Estimated Cost: $${totalValue}`;
    } else if (isNaN(totalValue)) {
      totalValueString = "";
    } else {
      totalValueString = "";
    }
  }

  useEffect(() => {
    setUniqueCryptoId(+id);
    dispatch(getOneCrypto(+id)).then(() => setLoaded(true));
  }, [dispatch, id]);

  useEffect(() => {
    const errors = [];

    if (isNaN(amount) || amount === "") {
      errors.push("Please enter a number");
    }

    if (amount < 0) {
      errors.push("Please enter a value greater than zero");
    }

    setErrors(errors);
  }, [amount]);

  useEffect(() => {
    setUniqueCryptoId(+id);
    dispatch(getOneCrypto(+id)).then(() => setLoaded(true));
  }, [dispatch, id]);

  useEffect(() => {
    const errors = [];

    if (isNaN(amount) || amount === "") {
      errors.push("Please enter a number");
    }

    setErrors(errors);
  }, [amount]);

  if (loaded) {
    return (
      <div className="pageContainer">
        <div className="cryptoInfoContainer">
          <div className="cryptoName">{singleCrypto[0]?.name}</div>
          <div className="cryptoPrice">
            ${singleCrypto[0]?.price.toLocaleString("en-US")}
          </div>
        </div>
        <div className="graph">plot graph</div>
        <div className="graphHistorySelect">
          <div className="graphButtonContainer">
            <button
              type="button"
              className="hisButt"
              id="1d"
              onClick={() => colorChange("1d")}
              style={{ color: textColor }}
            >
              1D
            </button>
            <button
              type="button"
              className="hisButt"
              id="1w"
              onClick={() => colorChange("1w")}
              style={{ color: textColor }}
            >
              1W
            </button>
            <button
              type="button"
              className="hisButt"
              id="1m"
              onClick={() => colorChange("1m")}
              style={{ color: textColor }}
            >
              1M
            </button>
            <button
              type="button"
              className="hisButt"
              id="1y"
              onClick={() => colorChange("1y")}
              style={{ color: textColor }}
            >
              1Y
            </button>
            <button
              type="button"
              className="hisButt"
              id="all"
              onClick={() => colorChange("all")}
              style={{ color: textColor }}
            >
              ALL
            </button>
          </div>
        </div>
        <form className="formContainer" onSubmit={onSubmit}>
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
        <div className="add_to_list">
          <AddToList cryptoId={id} />
        </div>
        <div className="about">About</div>
        <hr className="hr" />
        <div className="aboutContainer">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget
          sem posuere, cursus magna vitae, dapibus ex. Praesent tincidunt porta
          auctor. Pellentesque vestibulum dui sed iaculis iaculis. Quisque sed
          magna mollis, commodo libero ac, tristique eros. Maecenas dapibus orci
          vitae interdum ultrices. Nam luctus lorem ligula, in iaculis metus
          scelerisque ac. Donec ac bibendum neque. Vivamus ut turpis vel libero
          vulputate lacinia sed at est. Pellentesque ultrices efficitur ligula
          non tristique. Pellentesque porta urna justo, venenatis fermentum dui
          lobortis vel. Curabitur et aliquet eros. Aenean pulvinar semper augue
          et mollis.
        </div>
        <CryptoNews crypto={singleCrypto[0]} />
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default PurchaseCryptoPage;
