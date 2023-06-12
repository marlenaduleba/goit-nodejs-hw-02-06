const Joi = require("joi");
const contactBodyValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().min(3).required().email(),
    phone: Joi.string()
      .min(6)
      .pattern(/^[+]?[0-9 ()-]*$/)
      .required(),
    favorite: Joi.boolean().required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.send({
      status: "400",
      response: result.error.details[0].message,
    });
  } else {
    next();
  }
};

const updateFavoriteValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.send({
      status: "400",
      response: result.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = { contactBodyValidation, updateFavoriteValidation };