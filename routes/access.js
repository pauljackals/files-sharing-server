const router = require("express").Router()
const passport = require("../config/passport")
const User = require("../models/User")
const { authenticateUser } = require("../utils/middlewares")
const { cleanUser } = require("../utils/functions")

router
    .post("/register", (req, res, next) => {
        const {username, password} = req.body

        User.register({username}, password, (err, user) => {
            if(err) {
                return next(err)
            }
            cleanUser(user)
            res.status(201).json({user})
        })

    })
    .post("/login", (req, res, next) => {
        passport.authenticate("local", {badRequestMessage: new Error("missing credentials")}, (err, user, info) => {
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
