const Joi = require("joi");

const createProductSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    price:Joi.number().min(0).required(),
    discount:Joi.number().integer().min(0).max(100).optional(),
    count_safe:Joi.number().integer().min(0).optional(),
    category_id:Joi.string().required(),
    avt:Joi.string().optional()

})

const updateProductSchema= Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    price: Joi.number().min(0).optional(),
    discount: Joi.number().integer().min(0).max(100).optional(),
    count_sale: Joi.number().integer().min(0).optional(),
    category_id: Joi.string().optional(),
    avt: Joi.string().optional()
})
module.exports={
    createProductValid:(body)=>createProductSchema.validate(body),
    updateProductValid:(body)=>updateProductSchema.validate(body)
}