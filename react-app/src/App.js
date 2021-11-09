import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import { getAllCrypto } from "./store/crypto"
import Navigation from "./components/Splash/Navigation";
import Splash from "./components/Splash/Splash";
import PurchaseCryptoPage from "./components/PurchaseCryptoPage";
import AuthNavigation from "./components/Navigation/AuthNavigation";
import Home from "./components/Home/Home";
import HelloPlot from "./components/Plot/HelloPlot"

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state.crypto?.crypto);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    (async () => {
      await dispatch(getAllCrypto())
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
          <NavBar />
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <NavBar />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true}>
          <AuthNavigation />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/hello-plot" exact={true}>
          <HelloPlot />
        </ProtectedRoute>
        <Route path="/purchaseCrypto/:id" exact={true}>
          <NavBar />
          <PurchaseCryptoPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
