const express = require("express");
const { signup, signout } = require("../../controllers/AdminControllers/auth");
const {
  validateSignupRequest,
  isRequestValidated,
} = require("../../validators/auth");
const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signout", signout);

module.exports = router;
