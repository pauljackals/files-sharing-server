const router = require("express").Router()
const { handleUnknownRoutes, authenticateUser, authorizeAdmin } = require("../utils/middlewares")
const access = require("./access")
const admin = require("./admin")

router
    .use("/access", access)
    .use("/admin", authenticateUser, authorizeAdmin, admin)
    .use(handleUnknownRoutes)

module.exports = router
