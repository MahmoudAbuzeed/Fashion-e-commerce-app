const User = require("../models/user");
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
      role: "user",
    });

    try {
      const user = await newUser.save();
      return res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }
};

exports.signin = async (req, res, next) => {
  //Username, password in request
  const { email, password } = req.body;
  try {
    //Retrieve user information
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error(`The email ${email} was not found on our system`);
      err.status = 400;
      return next(err);
    }

    //Check the password
    user.isPasswordMatch(password, user.password, (err, matched) => {
      if (matched && user.role === "user") {
        //Generate JWT
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        return res.send({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }

      res.status(400).send({
        error: "Invalid username/password combination",
      });
    });
  } catch (e) {
    next(e);
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
