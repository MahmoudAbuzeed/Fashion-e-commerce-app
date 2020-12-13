const shortid = require("shortid");

const AuthService = require("../../Services/UserServices/AuthService");

exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const userObject = {
    firstName,
    lastName,
    email,
    password,
    username: shortid.generate(),
    role: "user",
  };
  const authService = new AuthService();
  const userSignup = await authService.userSignup(userObject);
  return res.status(201).json({ user: userSignup });
};

exports.signin = async (req, res, next) => {
  //Username, password in request
  const { email, password } = req.body;
  const authService = new AuthService();
  const userSignin = await authService.userSignin(email, password);
  return res.status(201).json({ user: userSignin });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
