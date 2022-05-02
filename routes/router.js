const router = require("express").Router()
const { handleUnknownRoutes } = require("../utils/middlewares")
const access = require("./access")

router
    .use("/access", access)
    .use(handleUnknownRoutes)

module.exports = router
