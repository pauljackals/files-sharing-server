const expressSession = require("express-session")
const store = require("./store")

const secret = process.env.SERVER_SESSION_SECRET

module.exports = expressSession({
    secret,
    saveUninitialized: false,
    resave: false,
    store,
})
