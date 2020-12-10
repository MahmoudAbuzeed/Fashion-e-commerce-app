const { requireSignin } = require("../common-middleware");
const { addOrder, getOrders, getOrder } = require("../controllers/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, addOrder);
router.get("/getOrders", requireSignin, getOrders);
router.post("/getOrder", requireSignin, getOrder);

module.exports = router;
