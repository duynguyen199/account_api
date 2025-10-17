const Joi= require("joi")

const createCategorySchema = Joi.object({
    name:Joi.string().required(),
    avt:Joi.string().optional()
})
module.exports = {
    createCategoryValid:(body)=> createCategorySchema.validate(body)
  };