const express = require("express");
const { addItemToCart, getCartItems } = require("../controllers/cart");
const { requireSignin, userMiddleware } = require("../common-middleware/index");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignin,
  /*userMiddleware*/ addItemToCart
);
router.post(
  "/user/cart/getCartItems",
  requireSignin,
  /*userMiddleware*/ getCartItems
);

module.exports = router;
