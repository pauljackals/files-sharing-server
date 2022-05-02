const router = require("express").Router()
const code = require("./code")

router
    .use("/code", code)

module.exports = router
