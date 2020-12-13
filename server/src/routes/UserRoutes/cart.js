const express = require("express");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../../controllers/UserControllers/cart");
const { requireSignin } = require("../../common-middleware");
const router = express.Router();

router.post("/user/cart/addtocart", requireSignin, addItemToCart);
router.post("/user/getCartItems", requireSignin, getCartItems);
//new update
router.post("/user/cart/removeItem", requireSignin, removeCartItems);

module.exports = router;
