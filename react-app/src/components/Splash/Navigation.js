import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PurchaseCryptoModal from "../PurchaseCryptoModal.js/purchaseCryptoModal.js";

const Navigation = () => {
  const nav = useRef(null);
  const arrow1 = useRef(null);
  const arrow3 = useRef(null);
  const [num, setNum] = useState(0);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (num === 0) {
      nav?.current.classList.add("hidden");
    } else {
      nav?.current.classList.remove("hidden");
    }
  }, [num]);

  const arrowUp = (n) => {
    if (num === n) {
      arrow1.current.innerText = "▼";
      arrow3.current.innerText = "▼";
      return setNum(0);
    }

    if (n === 1) {
      arrow1.current.innerText = "▲";
      arrow3.current.innerText = "▼";
      return setNum(1);
    }

    if (n === 3) {
      arrow3.current.innerText = "▲";
      arrow1.current.innerText = "▼";
      return setNum(3);
    }
  };

  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="updateCrypto">
        <PurchaseCryptoModal />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="combined-bar">
      <div className="navbar">
        <img
          src="https://fontmeme.com/permalink/211103/80dc09475ec374f44b603d9a56f8f4c0.png"
          className="nav-img"
        />
        <img
          className="nav-coin"
          src="https://thumbs.gfycat.com/SkinnyAccomplishedBoa-size_restricted.gif"
        />
        <div className="navlinks">
          <p className="links products" onClick={() => arrowUp(1)}>
            What we offer{" "}
            <p className="arrow" ref={arrow1}>
              ▼
            </p>
          </p>
          <p className="links who" onClick={() => arrowUp(3)}>
            Who we are{" "}
            <p className="arrow" ref={arrow3}>
              ▼
            </p>
          </p>
        </div>
        <div className="nav-right">
          {!user ? (
            <>
              <NavLink to="/login" className="login">
                Log In
              </NavLink>
              <NavLink to="/signup" className="signup">
                Sign Up
              </NavLink>
            </>
          ) : (
            <NavLink to="/home" className="signup">
              My Account
            </NavLink>
          )}
        </div>
      </div>
      <div className="bottom-nav" ref={nav}>
        {num === 1 && (
          <div className="nav-offer">
            <div>• Simulated Crypto Purchases</div>
            <div>• Crypto Information</div>
            <div>• Simulated Fund Deposits</div>
          </div>
        )}
        {num === 3 && (
          <div className="nav-offer">
            <div>• Created by App Academy Students</div>
            <NavLink className="links" to="/about">
              About the site creators
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
