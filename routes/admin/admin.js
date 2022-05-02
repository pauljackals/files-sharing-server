const router = require("express").Router()
const code = require("./code")
const user = require("./user")

router
    .use("/code", code)
    .use("/user", user)

module.exports = router
