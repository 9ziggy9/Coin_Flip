import { useRef } from "react";
import "./Watchlist.css";

const Watchlist = () => {
    const listInput = useRef(null)

    const show = () => {
        listInput.current.classList.remove('hidden')
    }

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
        <div className="watch-list-right" onClick={show}>+</div>
      </div>
      <div className="create-list hidden" ref={listInput}>
          <input className="list-input" placeholder="List Name" />
          <div className="list-buttons">
              <button className="list-cancel">Cancel</button>
              <button className="list-submit">Create List</button>
          </div>
      </div>
    </div>
  );
};

export default Watchlist;
