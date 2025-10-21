const express = require("express")
const asyncMiddleware = require("../middleware/async.middleware.js")
const authMiddleware = require("../middleware/auth.Middleware")
const { createComment, getCommentsByProduct, deleteComment } = require("../controllers/comment.controller")
const roleMiddleware = require("../middleware/role.middleware")
const typeRoles = require("../constants/type.roles")
const commentRouter = express.Router()

commentRouter.route("/").post(asyncMiddleware(authMiddleware), asyncMiddleware(createComment))


commentRouter.route("/:id").get(asyncMiddleware(authMiddleware), asyncMiddleware(getCommentsByProduct))

commentRouter.delete(
    "/:id",
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeRoles.ADMIN, typeRoles.USER]),
    asyncMiddleware(deleteComment)
  );


  module.exports = commentRouter