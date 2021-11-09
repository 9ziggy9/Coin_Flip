import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const AuthNavigation = ({ cryptos }) => {
  let arr;

  const searchCrypto = (params) => {
    let filtered = cryptos?.filter(
      (crypto) =>
        crypto.name?.toLowerCase().startsWith(params.toLowerCase()) ||
        crypto.symbol?.toLowerCase().startsWith(params.toLowerCase())
    );

    arr = filtered;
    console.log(arr);
  };

  return (
    <div className="nav-main">
      <img src="https://img.icons8.com/ios/16/000000/bitcoin--v2.png" />
      <div className="search-container">
        <input
          placeholder="Search"
          className="search-bar"
          onChange={(e) => searchCrypto(e.target.value)}
        />
        <div className="search-results">
          {cryptos &&
            cryptos.map((a) => (
              <>
                {arr?.find(
                  (ar) => a.name === ar.name || a.symbol == ar.symbol
                ) ? (
                  <>
                    <div>{a.symbol}</div>
                    <div>{a.name}</div>
                  </>
                ) : null}
              </>
            ))}
        </div>
      </div>
      <div className="right-nav">
        <NavLink to="/messaages">Messages</NavLink>
        <div className="account">Account</div>
      </div>
    </div>
  );
};

export default AuthNavigation;
