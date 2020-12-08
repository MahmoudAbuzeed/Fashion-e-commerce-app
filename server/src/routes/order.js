const { requireSignin, userMiddleware } = require("../common-middleware");
const {
  addOrder,
  getOrders,
  getOrderById,
  deleteOrder,
} = require("../controllers/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/getOrderById/:id", requireSignin, userMiddleware, getOrderById);
router.delete("/deleteOrder/:id", requireSignin, userMiddleware, deleteOrder);

module.exports = router;
