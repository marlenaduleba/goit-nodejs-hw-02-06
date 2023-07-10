const User = require("../../models/user.js");
const { HttpError } = require("../../helpers/index.js");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");
const { HOST, PORT } = process.env;

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

    const verificationToken = uuidv4();

    const user = new User({
      email,
      password: hashedPassword,
      subscription: "starter",
      avatarURL,
      verify: false,
      verificationToken,
    });

    console.log("Generated verification token:", verificationToken);

    await user.save();

    const verificationLink = `http://${HOST}:${PORT}/api/users/verify/${verificationToken}`;

    const msg = {
      to: email,
      from: "marlena_duleba@o2.pl",
      subject: "Email address confirmation",
      text: `Click the link to confirm your email address: ${verificationLink}`,
      html: `<p>Click<a target="_blank" href="${verificationLink}"> here </a>to confirm your email address.</p>`,
    };

    await sendEmail(msg);

    console.log(
      `User with email: ${user.email} has been successfully singed up`.success
    );
    res.status(201).json({ message: "Signed up", user });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
