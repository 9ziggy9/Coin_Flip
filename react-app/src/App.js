import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import { getAllCrypto } from "./store/crypto";
import Navigation from "./components/Splash/Navigation";
import Splash from "./components/Splash/Splash";
import PurchaseCryptoPage from "./components/PurchaseCryptoPage";
import AuthNavigation from "./components/Navigation/AuthNavigation";
import Home from "./components/Home/Home";
import Transactions from "./components/Transactions/Transaction";
import Settings from "./components/Settings/Settings";
import About from "./components/About/About";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
    })();
    (async () => {
      await dispatch(getAllCrypto());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/" exact={true}>
          <Navigation />
          <Splash />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/about" exact={true}>
          <About />
        </Route>
        <ProtectedRoute path="/home" exact={true}>
          <AuthNavigation />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/crypto/:id" exact={true}>
          <AuthNavigation />
          <PurchaseCryptoPage />
        </ProtectedRoute>
        <ProtectedRoute path="/transactions" exact={true}>
          <AuthNavigation />
          <Transactions />
        </ProtectedRoute>
        <ProtectedRoute path="/account/settings" exact={true}>
          <AuthNavigation />
          <Settings />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
