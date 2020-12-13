const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  initialData,
} = require("../../controllers/AdminControllers/initialData");
const router = express.Router();

router.post("/initialdata", requireSignin, adminMiddleware, initialData);

module.exports = router;
