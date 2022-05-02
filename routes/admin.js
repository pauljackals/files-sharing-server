const router = require("express").Router()

router
    .get("/code", (req, res, next) => {
        res.status(200).json({})
    })

module.exports = router
