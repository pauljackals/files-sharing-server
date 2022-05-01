const isDevelopment = require("./config/isDevelopment")
if(isDevelopment) {
    require("dotenv").config()
}
