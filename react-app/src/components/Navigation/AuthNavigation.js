import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findCrypto } from "../../store/crypto";
import AccountNav from "./AccountNav";
import "./AuthNavigation.css";

const AuthNavigation = () => {
  const history = useHistory();
  const results = useRef(null);
  const searchBar = useRef(null);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const searchResults = useSelector((state) => state.crypto.searchRes);
  const regex = new RegExp(search, "gi");

  const removeBorder = () => {
    searchBar.current.style.borderBottomLeftRadius = "0px";
    searchBar.current.style.borderBottomRightRadius = "0px";
  };

  const addBorder = () => {
    searchBar.current.style.borderBottomLeftRadius = "4px";
    searchBar.current.style.borderBottomRightRadius = "4px";
  };

  const hide = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      results.current.classList.add("hidden");
      searchBar.current.style.backgroundColor = "black";
      searchBar.current.style.borderBottom = "0.5px solid grey";
      addBorder();
    } else {
      searchBar.current.style.backgroundColor = "rgb(42, 47, 51)";
      searchBar.current.style.borderBottom = "none";
    }
  };

  const show = (e) => {
    searchBar.current.style.backgroundColor = "rgb(42, 47, 51)";
    if (e.target.value.length > 0) {
      results.current.classList.remove("hidden");
      searchBar.current.style.borderBottom = "none";
      removeBorder();
    } else {
      searchBar.current.style.borderBottom = "0.5px solid grey";
    }
  };

  const colorChange = () => {
    if (results.current.classList.contains("hidden")) {
      searchBar.current.style.backgroundColor = "black";
    }
  };

  useEffect(() => {
    if (search?.length > 0) {
      dispatch(findCrypto(search));
      results.current.classList.remove("hidden");
      searchBar.current.style.borderBottom = "none";
      removeBorder();
    } else {
      results.current.classList.add("hidden");
      searchBar.current.style.borderBottom = "0.5px solid grey";
      addBorder();
    }
  }, [search, dispatch]);

  return (
    <div className="nav-main" onBlur={(e) => hide(e)}>
      <img
        className="nav-coin-auth"
        src="https://thumbs.gfycat.com/SkinnyAccomplishedBoa-size_restricted.gif"
        onClick={() => history.push("/home")}
      />
      <div className="search-container">
        <input
          placeholder="Search"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={(e) => show(e)}
          ref={searchBar}
          onMouseEnter={() =>
            (searchBar.current.style.backgroundColor = "rgb(42, 47, 51)")
          }
          onMouseLeave={colorChange}
        />
        <div
          className="search-results hidden"
          tabIndex={0}
          ref={results}
          onMouseEnter={() =>
            (searchBar.current.style.backgroundColor = "rgb(42, 47, 51)")
          }
        >
          {searchResults?.length > 0 &&
            search?.length > 0 &&
            searchResults.map((result, i) => (
              <div key={i} className="result">
                <div
                  dangerouslySetInnerHTML={{
                    __html: result.symbol.replace(
                      regex,
                      (match) => `<span>${match}</span>`
                    ),
                  }}
                ></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: result.name.replace(
                      regex,
                      (match) => `<span>${match}</span>`
                    ),
                  }}
                ></div>
              </div>
            ))}
          {searchResults?.length === 0 && search?.length > 0 && (
            <div className="result">
              We were unable to find any results for your search.
            </div>
          )}
        </div>
      </div>
      <div className="right-nav">
        <NavLink to="/messaages">Messages</NavLink>
        <div className="account">
          <div className="account-word">Account</div>
            <AccountNav />
        </div>
      </div>
    </div>
  );
};

export default AuthNavigation;
