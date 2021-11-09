import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findCrypto } from "../../store/crypto";
import "./Navigation.css";

const AuthNavigation = ({ cryptos }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const searchResults = useSelector((state) => state.crypto.searchRes);

  useEffect(() => {
      dispatch(findCrypto(search));
  }, [search, dispatch]);

  return (
    <div className="nav-main">
      <img src="https://img.icons8.com/ios/16/000000/bitcoin--v2.png" />
      <div className="search-container">
        <input
          placeholder="Search"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-results">
          {searchResults?.length > 0 && search?.length > 0
            ? searchResults.map((result, i) => (
                <div key={i}>
                  <div>{result.symbol}</div>
                  <div>{result.name}</div>
                </div>
              ))
            : null}
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
