import { useRef, useState } from "react";
import "./Watchlist.css";

const Watchlist = () => {
  const [input, setInput] = useState()
  const listInput = useRef(null);

  const submit = (e) => {
    e.preventDefault();
  };

  const cancel = (e) => {
    e.preventDefault()
    listInput.current.classList.add("hidden")
  }

  const show = () => {
    listInput.current.classList.remove("hidden");
  };

  return (
    <div className="watch-main">
      <div className="watch-cryptos">Cryptocurrencies</div>
      <div className="watch-crypto">
        <div className="watch-crypto-card">
          <div className="watch-crypto-card-left">
            <div className="watch-crypto-name">Test Crypto</div>
            <div className="watch-crypto-shares">30 shares</div>
          </div>
          <div className="watch-crypto-card-right">
            <div className="watch-crypto-price">$11.52</div>
            <div className="watch-crypto-percentage">-6.95%</div>
          </div>
        </div>
      </div>
      <div className="watch-list">
        <div className="watch-list-left">Lists</div>
        <div className="watch-list-right" onClick={show}>
          +
        </div>
      </div>
      <form className="create-list hidden" ref={listInput}>
        <input className="list-input" placeholder="List Name" onChange={(e) => setInput(e.target.value)} required />
        <div className="list-buttons">
          <button onClick={(e) => cancel(e)}className="list-cancel">Cancel</button>
          <button onClick={(e) => submit(e)} className="list-submit">
            Create List
          </button>
        </div>
      </form>
    </div>
  );
};

export default Watchlist;
