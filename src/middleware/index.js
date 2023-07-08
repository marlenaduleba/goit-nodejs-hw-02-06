const auth = require("./auth.js");
const { contactJoi, favoriteJoi } = require("./contactValidation.js");
const isValidId = require("./isValidId.js");
const { userJoi, subscriptionJoi } = require("./userValidation.js");
const { validation, validationFavorite } = require("./validation.js");
const errorValidation = require("./errorValidation.js");
const upload = require("./upload.js");

module.exports = {
  auth,
  contactJoi,
  favoriteJoi,
  isValidId,
  userJoi,
  subscriptionJoi,
  validation,
  validationFavorite,
  errorValidation,
  upload,
};
