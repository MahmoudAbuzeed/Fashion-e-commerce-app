import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineUnorderedList } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { signout, signup as _signup } from "../../actions";

import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);

  const { user } = auth;

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInMenu = () => {
    return (
      <Nav>
        <Link style={{ color: "#fff", textDecoration: "none" }} to="/cart">
          <TiShoppingCart /> &nbsp;Cart
        </Link>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link
          style={{ color: "#fff", textDecoration: "none" }}
          to="/account/orders"
        >
          <AiOutlineUnorderedList /> &nbsp;My Orders
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
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ zIndex: 1 }}
      >
        <Container fluid>
          <Link to="/">
            <Navbar.Brand>Fashion E-Commerce</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">
                {user && user.role === "admin" && (
                  <Link
                    style={{ color: "#FE0000", textDecoration: "none" }}
                    to="/admin/categories"
                  >
                    Admin Pannel
                  </Link>
                )}
              </Nav.Link>
            </Nav>

            {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
