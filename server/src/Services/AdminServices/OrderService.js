const Order = require("../../models/order");

class OrderService {
  async updateOrder(orderId, orderStatus) {
    const order = await Order.updateOne(
      { _id: orderId, "orderStatus.type": orderStatus },
      {
        $set: {
          "orderStatus.$": [
            { type: req.body.type, date: new Date(), isCompleted: true },
          ],
        },
      }
    );
    if (order) {
      return order;
    } else {
      return null;
    }
  }

  async getCustomerOrders() {
    const orders = await Order.find({})
      .populate("items.productId", "name")
      .exec();
    return orders;
  }
}
module.exports = OrderService;
