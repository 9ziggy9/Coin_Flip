import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./Signup.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-main">
      <div className="signup-background-left">
        <div className="signup-left">
          <img
            className="signup-logo"
            src="https://fontmeme.com/permalink/211103/80dc09475ec374f44b603d9a56f8f4c0.png"
          />
          <div className="signup-text">Make Your Fake Money Move</div>
          <div className="signup-text-again">
            CoinFlip lets you fake invest in cryptos you love, risk-free.
          </div>
          <div className="signup-label">
            Please enter your preferred username. Your username should match
            anything you want.
          </div>
          <form autoComplete="off" onSubmit={onSignUp} className="signup-form">
            <div>
              <input
                placeholder="Username"
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <input
                placeholder="Email"
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <input
                placeholder="Repeat Password"
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className="signup-submit">
              <button className="signup-button" type="submit">
                Sign Up
              </button>
              <div className="signup-btn-login">
                <p>Already Started?</p>
                <NavLink className="signup-login" to="/login">
                  Log in to start fake trading
                </NavLink>
              </div>
            </div>
          </form>
          <div className="signup-errors">
            {errors.map((error, ind) => (
              <div key={ind}>• {error}</div>
            ))}
          </div>
          <div className="signup-bottom-disclaimer">
              <div className="signup-disclaimer">
                <p>All investments involve risk, including the possible loss of principal. Investors should consider their investment objectives and risks carefully before investing.</p>
              </div>
              <div className="signup-disclaimer">
                <p>That being said, if you're stressing out over a fake trading account,
                  <a href="https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-relievers/art-20047257"> here </a>
                  is something that might help you.
                </p>
              </div>
              <div className="signup-disclaimer">
                <p>!© 2021 Coinflip.All rights reserved.</p>
              </div>
          </div>
      </div>
      </div>
      <div className="signup-right">
        <div className="signup-right-background">
          <div className="signup-right-container">
            <div className="signup-right-header">
              <h4 className="right-header-title">
                Risk-free trading
              </h4>
              <p>This is a fake trading account. There is no way to gain money or lose money on this platform. You'll be able to add free money into your account and trade cryptocurrencies based on live current prices.</p>
            </div>
            <div className="signup-right-header">
              <h4 className="right-header-title">
                Account Protection
              </h4>
              <p>Our platform does not store user passwords so you're fake trading account cannot be accessed by anyone, even by us.</p>
            </div>
            <div className="signup-right-header">
              <h4 className="right-header-title">
                Stay on top of your portfolio
              </h4>
              <p>Set up customized watchlists to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of into is up to you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
