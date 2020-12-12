import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import NewPage from "./pages/NewPage";

import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn } from "./actions";
import { useDispatch, useSelector } from "react-redux";

import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />

        <PrivateRoute path="/admin/page" component={NewPage} />
        <PrivateRoute path="/admin/category" component={Category} />
        <PrivateRoute path="/admin/products" component={Products} />
        <PrivateRoute path="/admin/orders" component={Orders} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />

        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/account/orders" component={OrderPage} />

        <Route
          path="/:productSlug/:productId/p"
          component={ProductDetailsPage}
        />
        <Route path="/:slug" component={ProductListPage} />
      </Switch>
    </div>
  );
}

export default App;
