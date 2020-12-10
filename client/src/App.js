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

import ProductListPage from "./pages/ProductListPage";

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
        <Route path="/:slug" exact component={ProductListPage} />

        <PrivateRoute path="/admin/category" component={Category} />
        <PrivateRoute path="/admin/products" component={Products} />
        <PrivateRoute path="/admin/orders" component={Orders} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
