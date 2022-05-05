const { rootUsername } = require("../../config/constants")
const Code = require("../../models/Code")
const User = require("../../models/User")
const { NotFoundError, AuthorizationError } = require("../../utils/errors")
const store = require("../../config/store")

const router = require("express").Router()

router
    .get("/", (req, res, next) => {
        User.find().sort({username: "asc"}).exec()
            .then(users => {
                res.status(200).json({users})
            })
            .catch(err => next(err))
    })
    .delete("/:id", (req, res, next) => {
        const {id} = req.params
        User.findById(id).exec()
            .then(user => {
                if(!user) {
                    throw new NotFoundError("user not found")
                } else if(user._id.toString()===req.user._id.toString() || user.username===rootUsername) {
                    throw new AuthorizationError("cannot remove user")
                }
                return User.findByIdAndDelete(user._id).exec()
                    .then(() => Promise.all([
                        Code.findOneAndDelete({user}).exec(),
                        store.collectionP
                            .then(sessions =>
                                sessions.deleteMany({"session.passport.user": user.username})
                            )
                    ]))
                    .then(() => res.status(200).json({user}))
            })
            .catch(err => next(err))
    })

module.exports = router
