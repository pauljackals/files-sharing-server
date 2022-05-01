const router = require("express").Router()
const access = require("./access")

router
    .use("/access", access)

module.exports = router
