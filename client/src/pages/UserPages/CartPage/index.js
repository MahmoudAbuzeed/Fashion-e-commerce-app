import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/Layout/UserLayout";
import Card from "../../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems, removeCartItem } from "../../../actions";
import PriceDetails from "../../../components/PriceDetails";

import "./style.css";
import { Button } from "react-bootstrap";

/**
 * @author
 * @function CartPage
 **/

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  return (
    <div style={{ padding: "10px", marginTop: "10px" }}>
      <Layout>
        <div className="cartContainer" style={{ alignItems: "flex-start" }}>
          <Card
            headerLeft={`My Cart`}
            headerRight={<div>Deliver to</div>}
            style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
          >
            {Object.keys(cartItems).map((key, index) => (
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
                onRemoveCartItem={onRemoveCartItem}
              />
            ))}

            <div
              style={{
                width: "100%",
                display: "flex",
                background: "#ffffff",
                justifyContent: "flex-end",
                boxShadow: "0 0 10px 10px #eee",
                padding: "10px 0",
                boxSizing: "border-box",
              }}
            >
              <div style={{ width: "250px" }}>
                <Button onClick={() => props.history.push(`/checkout`)}>
                  PLACE ORDER
                </Button>
              </div>
            </div>
          </Card>
          <PriceDetails
            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
              return qty + cart.cartItems[key].qty;
            }, 0)}
            totalPrice={Object.keys(cart.cartItems).reduce(
              (totalPrice, key) => {
                const { price, qty } = cart.cartItems[key];
                return totalPrice + price * qty;
              },
              0
            )}
          />
        </div>
      </Layout>
    </div>
  );
};

export default CartPage;
