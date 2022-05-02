const router = require("express").Router()
const access = require("./access")

router
    .use("/access", access)
    .use((req, res, next) => {
        next(new Error("route not found"))
    })

module.exports = router
