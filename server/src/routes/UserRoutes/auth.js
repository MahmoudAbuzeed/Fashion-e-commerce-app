const express = require("express");
const { signup, signin } = require("../../controllers/UserControllers/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth");
const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/profile", (req, res) => {
  res.status(200).json({ user: "profile" });
});

module.exports = router;
