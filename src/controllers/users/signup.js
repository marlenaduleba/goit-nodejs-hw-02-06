const User = require("../../models/user.js");
const { HttpError } = require("../../helpers/index.js");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new HttpError(400, "Validation error");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HttpError(409, "Email in use");
    }

    const avatarURL = gravatar.url(
      email,
      { s: "250", r: "x", d: "retro" },
      true
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      subscription: "starter",
      avatarURL,
    });

    await user.save();
    console.log(
      `User with email: ${user.email} was successfully singed up`.success
    );
    res.status(201).json({ message: "Signed up", user });
  } catch (user) {
    next(user);
  }
};

module.exports = signup;
