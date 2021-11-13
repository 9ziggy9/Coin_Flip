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
import AddToList from "../AddToListModal/AddToList";
import { getUserList } from "../../store/watchlist";

const PurchaseCryptoPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();
  // const { pathname } = history.location;
  // const uniqueCryptoId = parseInt(pathname.split("/")[2])
  const [uniqueCryptoId, setUniqueCryptoId] = useState();
  const { id } = useParams();
  const [test, setTest] = useState()
  const [test2,setTest2] = useState()
  let cryptoPortfolio;
  let ports;

  const [transaction, setTransaction] = useState("purchase");
  let [amount, setAmount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);

  const userId = currentUser?.id;

  useEffect(() => {
    dispatch(getUserList(currentUser?.id));
  }, []);

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

    amount = parseInt(amount);

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
    console.log(newTransaction);

    if (hasPortfolio) {
      await dispatch(changePortfolio(newTransaction));
    } else {
      await dispatch(newPortfolio(newTransaction));
    }
  };

  const singleCrypto = useSelector((state) => {
    return state.crypto?.getOneCrypto;
  });

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
              placeholder="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
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
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const body = {
                old_password: test,
                new_password: test2
            }
            await fetch("/api/auth/password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });
          }}
        >
          <input value={test} onChange={(e) => setTest(e.target.value)} />
          <input value={test2} onChange={(e) => setTest2(e.target.value)} />
          <button>Submit</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default PurchaseCryptoPage;
