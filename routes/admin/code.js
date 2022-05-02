const Code = require("../../models/Code")

const router = require("express").Router()

router
    .get("/", (req, res, next) => {
        Code.find().exec()
            .then(codes => res.status(200).json({codes}))
            .catch(err => next(err))
    
    })
    .post("/", (req, res, next) => {
        const code = new Code()
        code.save()
            .then(code => res.status(201).json({code}))
            .catch(err => next(err))
    })

module.exports = router
