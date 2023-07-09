const User = require("../../models/user.js");
const { HttpError } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  const { _id, email } = req.user;
  const { description } = req.body;

  if (!req.file) {
    const error = new HttpError(400, "File not attached");
    return next(error);
  }

  const { originalname, path: tmpPath } = req.file;

  const imageName = `${email}_${originalname}`;

  const newPath = path.join(__dirname, "../../../public/avatars", imageName);
  const avatarURL = `http://${process.env.HOST}:${process.env.PORT}/api/avatars/${imageName}`;

  try {
    const image = await Jimp.read(tmpPath);
    await image.resize(250, 250);
    await image.writeAsync(tmpPath);
    await fs.rename(tmpPath, newPath);

    await User.findOneAndUpdate({ _id }, { avatarURL });
    console.log("File uploaded".success);
    res.status(200).json({
      message: "File uploaded",
      description,
      avatarURL: avatarURL,
    });
  } catch (error) {
    await fs.unlink(tmpPath);
    next(error);
  }
};

module.exports = updateAvatar;
