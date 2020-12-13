const User = require("../../models/user");

class UserService {
  async adminSignup(userObject) {
    const alreadyRegistered = await User.findOne({ email: userObject.email });
    if (alreadyRegistered) {
      return res.status(400).json({
        message: `Email address ${alreadyRegistered.email} is already taken`,
      });
    } else {
      const user = await User(userObject);
      user.save();
      return user;
    }
  }

  async adminSignin(email, password) {
    try {
      //Retrieve user information
      const user = await User.findOne({ email });
      if (!user) {
        const err = new Error(`The email ${email} was not found on our system`);
        return (err.status = 400);
      }

      //Check the password
      user.isPasswordMatch(password, user.password, (err, matched) => {
        if (matched) {
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
  }
}
module.exports = UserService;
