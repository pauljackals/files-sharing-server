const authenticateUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(new Error("authentication fail"))
    }
    next()
}

module.exports = {
    authenticateUser
}
