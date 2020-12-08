const express = require("express");
const Order = require("../models/order");

exports.addOrder = async (req, res) => {
  const {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const newOrder = new Order({
    orderItems: orderItems,
    user: req.user._id,
    shipping: shipping,
    payment: payment,
    itemsPrice: itemsPrice,
    taxPrice: taxPrice,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: "New Order Created", data: newOrderCreated });
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.send(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(400).send("Order Not Found.");
  }
};

exports.deleteOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send({ success: true, deletedOrder });
  } else {
    res.status(404).send("Order Not Found.");
  }
};
