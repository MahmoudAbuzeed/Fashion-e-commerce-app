import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn, getInitialData } from "./actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />

        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
