const OrderService = require("../../Services/AdminServices/OrderService");

exports.updateOrder = (req, res) => {
  const orderId = req.body.orderId;
  const orderStatus = req.body.type;
  const orderService = new OrderService();
  const order = orderService.updateOrder(orderId, orderStatus);
  return res.status(201).json({ order: order });
};

exports.getCustomerOrders = async (req, res) => {
  const orderService = new OrderService();
  const customerOrder = orderService.getCustomerOrders();
  return res.status(200).json({ customerOrder: customerOrder });
};
