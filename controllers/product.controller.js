const ErrorResponse = require("../helpers/ErrorResponse");
const categoryModel = require("../model/category.model");
const productModel = require("../model/product.model");
const { createCategoryValid } = require("../validations/category.valid");
const {
  createProductValid,
  updateProductValid,
} = require("../validations/product.valid");

module.exports = {
  createProduct: async (req, res) => {
    const { error, value } = createProductValid(req.body);
    if (error) throw new ErrorResponse(400, error.message);

    const foundCategory = await categoryModel.findById(value.category_id);
    if (!foundCategory) throw new ErrorResponse(404, "Category Not Found");

    let avtPath = "";

    const file = req.file;
    if (file) {
      avtPath = `/uploads/${req.file.filename}`;
    }
    const product = await productModel.create({
      name: value.name,
      price: value.price,
      discount: value.discount || 0,
      count_sale: value.count_sale || 0,
      category_id: value.category_id, // map field
      avt: avtPath,
    });
    return res.status(201).json(product);
  },
  getAllProducts: async (req, res) => {
    try {
      // 1️⃣ Parse pagination params
      const page = parseInt(req.query.page) || 1; // default page 1
      const limit = parseInt(req.query.limit) || 10; // default 10 per page
      const skip = (page - 1) * limit;

      // 2️⃣ Count total documents
      const totalProducts = await productModel.countDocuments();

      // 3️⃣ Fetch products with pagination
      const products = await productModel
        .find()
        .populate("category_id", "name avt")
        .sort({ createdAt: -1 }) // newest first
        .skip(skip)
        .limit(limit);

      // 4️⃣ Calculate pagination info
      const totalPages = Math.ceil(totalProducts / limit);

      return res.status(200).json({
        message: "Products retrieved successfully",
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
          limit,
        },
        products,
      });
    } catch (err) {
      throw new ErrorResponse(500, err.message || "Failed to fetch products");
    }
  },
  updateProductById: async (req, res) => {
    const { id } = req.params;
    if (!id) throw new ErrorResponse(404, "Not Found");
    const { error, value } = updateProductValid(req.body);
    if (error) throw new ErrorResponse(400, "error in validate update product");
    const { name, price, discount, count_sale, category_id } = value;

    const product = await productModel.findById(id);
    if (!product) throw new ErrorResponse(400, error.message);
    if (name) product.name = name;
    if (price) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (count_sale !== undefined) product.count_sale = count_sale;
    if (category_id) {
      const foundCategory = await categoryModel.findById(category_id);
      if (!foundCategory) throw new ErrorResponse(404, "Category not found");
      product.category_id = category_id;
    }

    // 5️⃣ Handle image upload
    if (req.file) {
      product.avt = `/uploads/${req.file.filename}`;
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  },
  deleteProduct:async(req,res)=>{
    return await productModel.findByIdAndDelete(req.params.id)
  }
};
