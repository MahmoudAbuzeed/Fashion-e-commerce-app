import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn } from "./actions";
import "./App.css";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import Products from "./pages/AdminPages/Products";
import Orders from "./pages/AdminPages/Orders";
import Categories from "./pages/AdminPages/Categories";
import NewPage from "./pages/AdminPages/NewPage";

import ProductListPage from "./pages/UserPages/ProductListPage";
import ProductDetailsPage from "./pages/UserPages/ProductDetailsPage";
import CartPage from "./pages/UserPages/CartPage";
import CheckoutPage from "./pages/UserPages/CheckoutPage";
import OrderPage from "./pages/UserPages/OrderPage";
import OrderDetailsPage from "./pages/UserPages/OrderDetailsPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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
        <PrivateRoute path="/admin/categories" component={Categories} />
        <PrivateRoute path="/admin/products" component={Products} />
        <PrivateRoute path="/admin/orders" component={Orders} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />

        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/account/orders" component={OrderPage} />
        <Route path="/order_details/:orderId" component={OrderDetailsPage} />
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
