const express = require("express");
const asyncMiddleware = require("../middleware/async.middleware.js");
const authMiddleware = require("../middleware/auth.Middleware");
const roleMiddleware = require("../middleware/role.middleware");
const typeRoles = require("../constants/type.roles");
const upload = require("../helpers/upload");
const {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProduct,
} = require("../controllers/product.controller");
const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRoles.ADMIN),
    upload.single("avt"),
    asyncMiddleware(createProduct)
  )
  .get(asyncMiddleware(getAllProducts));
productRouter
  .route("/:id")
  .patch(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRoles.ADMIN),
    upload.single("avt"),
    asyncMiddleware(updateProductById)
  )
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRoles.ADMIN),
    asyncMiddleware(deleteProduct)
  )

module.exports = productRouter;
