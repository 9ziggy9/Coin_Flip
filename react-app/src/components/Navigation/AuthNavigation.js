import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findCrypto } from "../../store/crypto";
import "./AuthNavigation.css";

const AuthNavigation = () => {
  const results = useRef(null);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const searchResults = useSelector((state) => state.crypto.searchRes);

  useEffect(() => {
    dispatch(findCrypto(search));
  }, [search, dispatch]);

  return (
    <div className="nav-main">
      <img className="nav-coin" src="https://thumbs.gfycat.com/SkinnyAccomplishedBoa-size_restricted.gif" />
      <div className="search-container">
        <input
          placeholder="Search"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-results" ref={results}>
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
