const Cart = require("../../models/cart");
const OrderService = require("../../Services/UserServices/OrderService");

exports.addOrder = (req, res) => {
  const userId = req.user._id;
  const { orderObj } = req.body;
  Cart.deleteOne({ userId });
  const orderService = new OrderService();
  const addOrder = orderService.addOrder(orderObj);
  return res.status(200).json({ addOrder: addOrder });
};

exports.getOrders = (req, res) => {
  const userId = req.user._id;
  const orderService = new OrderService();
  const getOrders = orderService.getOrders(userId);
  return res.status(200).json({ orders: getOrders });
};

exports.getOrder = (req, res) => {
  const orderId = req.body.orderId;
  const userId = req.user._id;
  const orderService = new OrderService();
  const getOrder = orderService.getOrder(orderId, userId);
  return res.status(200).json({ order: getOrder });
};
