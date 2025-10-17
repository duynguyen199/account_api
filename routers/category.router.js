const express = require("express");
const asyncMiddleware = require("../middleware/async.middleware.js");
const authMiddleware = require("../middleware/auth.Middleware");
const roleMiddleware = require("../middleware/role.middleware");
const typeRoles = require("../constants/type.roles");
const upload = require("../helpers/upload.js");
const { createCategory, updateCategory, deleteCategory, getAllCategory } = require("../controllers/category.controller.js");

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRoles.ADMIN),
    upload.single("avt"),
    asyncMiddleware(createCategory)
  )
  .get(asyncMiddleware(authMiddleware),asyncMiddleware(getAllCategory)),
  
  
  
categoryRouter
    .route("/:id")
    .patch(
        asyncMiddleware(authMiddleware),
        roleMiddleware(typeRoles.ADMIN),
        upload.single("avt"),
        asyncMiddleware(updateCategory)
    )
    .delete(
        asyncMiddleware(authMiddleware),
        roleMiddleware(typeRoles.ADMIN),
        asyncMiddleware(deleteCategory)
    )

  module.exports= categoryRouter