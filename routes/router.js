const router = require("express").Router()
const express = require("express")
const fs = require("fs")
const { sharedDirectory } = require("../config/constants")
const { handleUnknownRoutes, authenticateUser, authorizeAdmin } = require("../utils/middlewares")
const access = require("./access")
const admin = require("./admin/admin")
const directory = require("./directory")

if(!fs.existsSync(sharedDirectory)) {
    fs.mkdirSync(sharedDirectory)
}

router
    .use("/access", access)
    .use("/admin", authenticateUser, authorizeAdmin, admin)
    .use("/directory", authenticateUser, directory)
    .use("/shared", authenticateUser, express.static(sharedDirectory))
    .use(handleUnknownRoutes)

module.exports = router
