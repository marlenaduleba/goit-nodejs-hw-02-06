const User = require("../../models/user.js");
const { HttpError, sendEmail } = require("../../helpers");
const { HOST, PORT } = process.env;

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new HttpError(400, "Missing required field: email");
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    if (user.verify) {
      throw new HttpError(400, "Verification has already been passed");
    }
    const verificationLink = `http://${HOST}:${PORT}/api/users/verify/${user.verificationToken}`;

    const msg = {
      to: email,
      from: "marlena_duleba@o2.pl",
      subject: "Email address confirmation",
      text: `Click the link to confirm your email address: ${verificationLink}`,
      html: `<p>Click<a target="_blank" href="${verificationLink}"> here </a>to confirm your email address.</p>`,
    };

    await sendEmail(msg);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
