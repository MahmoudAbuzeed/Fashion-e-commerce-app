import React, { useEffect, useState } from "react";
import "./style.css";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { signout, getCartItems, signup as _signup } from "../../../../actions";

import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const renderLoggedInMenu = () => {
    return (
      <Nav>
        <Link style={{ color: "#fff", textDecoration: "none" }} to="/cart">
          <TiShoppingCart /> &nbsp;Cart
        </Link>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span
          onClick={logout}
          style={{ cursor: "pointer", color: "#fff", textDecoration: "none" }}
        >
          Logout
        </span>
      </Nav>
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <Nav.Link>
        <Link style={{ color: "#fff", textDecoration: "none" }} to="/signin">
          Login
        </Link>
        &nbsp; &nbsp;
        <Link style={{ color: "#fff", textDecoration: "none" }} to="/signup">
          Signup
        </Link>
      </Nav.Link>
    );
  };

  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Fashion E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features"></Nav.Link>
            </Nav>
            {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
