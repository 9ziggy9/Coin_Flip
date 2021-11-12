import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import "./Login.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demo = () => {
    setEmail('demo@aa.io')
    setPassword('password')
    dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="login-main">
      <div className="login-right">
        <img
          className="login-img"
          src="https://i.pinimg.com/originals/30/aa/2a/30aa2a4cc243f548e16f4eb82a37339a.png"
        />
      </div>
      <div className="login-form">
        <div className="welcome-login">Welcome to CoinFlip</div>
        <form onSubmit={onLogin} className="login-submit">
          <div className="errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="email">
            <label className="email-label" htmlFor="email">
              Email
            </label>
            <input
              className="login-input"
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="password">
            <label className="password-label" htmlFor="password">
              Password
            </label>
            <input
              className="login-input"
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
            />
            <div className="login-lower">
              <button className="login-btn" type="submit">
                Login
              </button>
              <button onClick={demo} className="login-btn">Demo User</button>
            </div>
          </div>
        </form>
        <div className="login-redirect">
          <p>Not on CoinFlip? </p>{" "}
          <NavLink className="signup-link" to="/signup">Create an account</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
