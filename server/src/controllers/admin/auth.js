const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

exports.signup = async (req, res, next) => {
  const { email } = req.body;

  const alreadyRegistered = await User.findOne({ email });
  if (alreadyRegistered) {
    return res.status(400).json({
      message: `Email address ${alreadyRegistered.email} is already taken`,
    });
  } else {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      username: shortid.generate(),
      role: "admin",
    });

    try {
      const user = await newUser.save();
      return res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
