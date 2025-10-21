const Joi = require("joi");

const createCommentSchema = Joi.object({
  content: Joi.string().max(255).required(),
  star: Joi.number().min(0).max(5).required(),
  product: Joi.string().required(), // product id
});

module.exports = {
  createCommentValid: (body) =>
    createCommentSchema.validate(body, { abortEarly: false, stripUnknown: true }),
};
