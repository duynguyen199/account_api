const errorHandler = require("../middleware/error.handler")
const accountRouter = require("./account.router")
const authRouter = require("./auth.router")
const categoryRouter = require("./category.router")
const commentRouter = require("./comment.router")
const productRouter = require("./product.router")

module.exports=(app)=>{
    app.use("/api/auth",authRouter)
    app.use("/api/account",accountRouter)
    app.use("/api/category",categoryRouter)
    app.use("/api/product",productRouter)
    app.use("api/comment",commentRouter)
    app.use(errorHandler)

}