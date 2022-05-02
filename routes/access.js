const router = require("express").Router()
const passport = require("../config/passport")
const User = require("../models/User")
const { authenticateUser } = require("../utils/middlewares")
const { cleanUser } = require("../utils/functions")
const { MissingCredentialsError, NotFoundError, AuthorizationError } = require("../utils/errors")
const Code = require("../models/Code")

router
    .post("/register", (req, res, next) => {
        const {username, password, code} = req.body

        Code.findOne({code}).exec()
            .then(code => {
                if(!code) {
                    throw new NotFoundError("code not found")
                } else if (code.user) {
                    throw new AuthorizationError("code used")
                }

                const user = new User({
                    username,
                    admin: false
                })
                User.register(user, password, (err, user) => {
                    if(err) {
                        return next(err)
                    }

                    code.user = user
                    code.save()
                        .then(() => {
                            cleanUser(user)
                            res.status(201).json({user})
                        })
                        .catch(err => 
                            User.findByIdAndDelete(user._id).exec()
                                .finally(() => next(err))
                        )
                })

            })
            .catch(err => next(err))

    })
    .post("/login", (req, res, next) => {
        const errorFix = {badRequestMessage: new MissingCredentialsError("missing credentials")}
        
        passport.authenticate("local", errorFix, (err, user, info) => {
            const errFound = [err, info, info?.message].find(err => err instanceof Error)
            if(errFound) {
                return next(errFound)
            }
            req.login(user, err => {
                if(err) {
                    return next(err)
                }
                cleanUser(user)
                res.status(201).json({user})
            })

        })(req, res, next)

    })
    .delete("/logout", authenticateUser, (req, res, next) => {
        req.logout()
        req.session.destroy(() => {
            res.clearCookie("connect.sid")
            res.status(200).json({})
        })
    })

module.exports = router
