import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
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
          </div>
        </form>
        <div className="signup-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
