const { requireSignin } = require("../../common-middleware");
const {
  addOrder,
  getOrders,
  getOrder,
} = require("../../controllers/UserControllers/order");
const Order = require("../../models/order");
const { ErrorHandler } = require("../../Shared/lib/error");
const router = require("express").Router();

router.post("/addOrder", requireSignin, addOrder);
router.get("/getOrders", requireSignin, getOrders);
router.post("/getOrder", requireSignin, getOrder);

// 500 Internal Server Error
router.get("/500", (req, res) => {
  throw new ErrorHandler(500, "You Input String But Integer Is Required");
});

// 404 Page Testing
router.get("/:id", async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id });
  console.log(order);
  console.log("HEREEEEEEE");
  if (!order) return next();
  return res.status(200).json({ order });
});

module.exports = router;
