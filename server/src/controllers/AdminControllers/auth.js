const shortid = require("shortid");

const AuthService = require("../../Services/AdminServices/AuthService");

exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const adminObject = {
    firstName,
    lastName,
    email,
    password,
    username: shortid.generate(),
    role: "admin",
  };
  const authService = new AuthService();
  const adminSignup = await authService.adminSignup(adminObject);
  return res.status(201).json({ user: adminSignup });
};

exports.signin = async (req, res, next) => {
  //Username, password in request
  const { email, password } = req.body;
  const authService = new AuthService();
  const adminSignin = await authService.adminSignin(email, password);
  return res.status(201).json({ user: adminSignin });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
