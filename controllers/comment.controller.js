const Comment = require("../model/comment.model");
const Product = require("../model/product.model");
const ErrorResponse = require("../helpers/ErrorResponse");
const { createCommentValid } = require("../validations/comment.valid");

module.exports = {
  // ✅ Tạo comment (yêu cầu đăng nhập)
  createComment: async (req, res) => {
    const user = req.user;
    if (!user) throw new ErrorResponse(401, "Unauthorized");

    const { error, value } = createCommentValid(req.body);
    if (error) throw new ErrorResponse(400, error.details[0].message);

    const foundProduct = await Product.findById(value.product);
    if (!foundProduct) throw new ErrorResponse(404, "Product not found");

    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const comment = await Comment.create({
      content: value.content,
      star: value.star,
      product: value.product,
      account: user._id,
      images: imagePaths,
    });

    return res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  },

  // ✅ Lấy tất cả comment theo product
  getCommentsByProduct: async (req, res) => {
    const { productId } = req.params;

    const comments = await Comment.find({ product: productId })
      .populate("account", "username email avatarUrl role")
      .sort({ createdAt: -1 });

    return res.status(200).json(comments);
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;

    await Comment.findByIdAndDelete(id);

    return res.status(200).json({ message: "Comment deleted successfully" });
  },
};
