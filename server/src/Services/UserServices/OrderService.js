const Order = require("../../models/order");
const Address = require("../../models/address");

class OrderService {
  addOrder(orderObj) {
    const order = new Order(orderObj);

    order.save();
    return order;
  }

  async getOrders(userId) {
    const orders = await Order.find({ userId })
      .select("_id paymentStatus paymentType orderStatus items")
      .populate("items.productId", "_id name productPictures");
    return orders;
  }

  async getOrder(orderId, userId) {
    const order = Order.findOne({ orderId })
      .populate("items.productId", "_id name productPictures")
      .lean();

    if (order) {
      const address = Address.findOne({
        user: userId,
      });
      order.address = address.address.find(
        (adr) => adr._id.toString() == order.addressId.toString()
      );
      return order;
    }

    return orders;
  }
}

module.exports = OrderService;
