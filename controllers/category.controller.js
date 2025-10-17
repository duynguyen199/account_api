const { error } = require("console");
const ErrorResponse = require("../helpers/ErrorResponse");
const categoryModel = require("../model/category.model");
const { createCategoryValid } = require("../validations/category.valid");

module.exports={
    createCategory:async(req,res)=>{
        const { error,value } = createCategoryValid(req.body);
        const file = req.file
        
        if (error) {
          throw new ErrorResponse(400, error.details[0].message);
        }
        const {name}= req.body
        let avtPath = "";

        if(file){
            avtPath=`/uploads/${req.file.filename}`
        }
        const category = await categoryModel.create({
            name,
            avt: avtPath,
          });
          return res.status(201).json({
            message: "Category created successfully",
            category,
          });
    },
    updateCategory:async(req,res)=>{
        const {id} = req.params
        const {name} = req.body
        const cate = await categoryModel.findById(id)
        if(!cate) throw new ErrorResponse(404, error.details[0].message)

        if(name) cate.name = name
        if(req.file)cate.avt= `uploads/${req.file.filename}`
        await cate.save()  
        return res.status(200).json({
            message: "Category updated successfully",
            category: cate,
          });
    },
    deleteCategory:async(req,res)=>{
        const {id} = req.params
         await categoryModel.findByIdAndDelete(id)
         return res.status(200).json({
            message:"Deleted succesfully"
         })
    },
    getAllCategory:async(req,res)=>{
        const cate = await categoryModel.find()
        return res.status(200).json({
            total:cate.length,
            cate
        })
    }
}