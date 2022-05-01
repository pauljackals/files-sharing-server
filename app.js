const isDevelopment = require("./config/isDevelopment")
if(isDevelopment) {
    require("dotenv").config()
}

const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("./config/session")
const passport = require("./config/passport")
const router = require("./routes/router")
const port = process.env.EXPRESS_PORT || 3000

const app = express()
app
    .use(express.json())
    .use(cookieParser())
    .use(session)
    .use(passport.initialize())
    .use(passport.session())
    .use(router)

app.listen(port, () => console.log(`Server listening on port ${port}`))
