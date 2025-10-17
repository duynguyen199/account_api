const Joi = require("joi");

const registerAccountSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(new RegExp(/^[a-zA-Z0-9@$!%*.?&]{6,16}$/))
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  email: Joi.string().email().required(),
  role:Joi.string()
});

const updateAccountSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(new RegExp(/^[a-zA-Z0-9@$!%*.?&]{6,16}$/)),
});

module.exports = {
  registerAccountValid: (body) => registerAccountSchema.validate(body),
  updateAccountValid: (body) => updateAccountSchema.validate(body),
};
