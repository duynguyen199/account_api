const express = require("express")
const asyncMiddleware = require("../middleware/async.middleware.js")
const typeRoles = require("../constants/type.roles.js");
const { getAllAccounts } = require("../controllers/account.controller.js");
const roleMiddleware = require("../middleware/role.middleware.js");
const authMiddleware = require("../middleware/auth.Middleware.js");

const accountRouter = express.Router()

accountRouter.route("/").get(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRoles.ADMIN),
    asyncMiddleware(getAllAccounts)
    
)

module.exports= accountRouter