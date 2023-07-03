const User = require("../../models/user.js");
const {HttpError} = require("../../helpers");

const logout = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new HttpError(401, "Not authorized");
      // return res.status(401).json({ message: "Not authorized" });
    }
    user.token = null;
    await user.save();
    console.log("Logged out".success);
    return res.status(204).header("X-Message", "Logged out").end();

    // await User.findByIdAndUpdate(id, { token: null });
    // res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
