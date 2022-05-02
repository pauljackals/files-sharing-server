const Code = require("../../models/Code")
const { NotFoundError, AuthorizationError } = require("../../utils/errors")
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
    .delete("/:id", (req, res, next) => {
        const {id} = req.params
        Code.findById(id).exec()
            .then(code => {
                if(!code) {
                    throw new NotFoundError("code not found")
                } else if (code.user) {
                    throw new AuthorizationError("code used")
                }
                return Code.findByIdAndDelete(code._id).exec()
                    .then(() => res.status(200).json({code}))

            })
            .catch(err => next(err))
    })

module.exports = router
