const CartService = require("../../Services/UserServices/CartService");

exports.addItemToCart = (req, res) => {
  const userId = req.user._id;
  const cartService = new CartService();
  const cart = cartService.addItemToCart(userId);
  return res.status(200).json({ cart: cart });
};

exports.getCartItems = (req, res) => {
  const userId = req.user._id;
  const cartService = new CartService();
  const getCartItems = cartService.getCartItems(userId);
  return res.status(200).json({ CartItems: getCartItems });
};

exports.removeCartItems = (req, res) => {
  const { productId } = req.body.payload;
  const cartService = new CartService();
  const removeCartItems = cartService.removeCartItems(productId);
  return res.status(200).json({ removedCartItems: removeCartItems });
};
