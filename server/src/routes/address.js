const express = require("express");
const { requireSignin } = require("../common-middleware");
const { addAddress, getAddress } = require("../controllers/address");
const router = express.Router();

router.post("/user/address/create", requireSignin, addAddress);
router.post("/user/getaddress", requireSignin, getAddress);

module.exports = router;
