const isDevelopment = require("./config/isDevelopment")
if(isDevelopment) {
    require("dotenv").config()
}

const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("./config/session")
const passport = require("./config/passport")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

const port = process.env.EXPRESS_PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))
