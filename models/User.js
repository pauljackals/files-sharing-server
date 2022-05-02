const {Schema, model} = require("../config/mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const { BOOLEAN } = require("./types")
const { rootUsername } = require("../config/constants")

const userSchema = new Schema({
    admin: BOOLEAN
})

const passwordValidator = (password, cb) => {
    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,256}$/)) {
        return cb(new Error("validation error"))
    }
    cb()
}
const usernameValidator = username => {
    const regex = new RegExp(`^[A-Za-z0-9]{1,32}${rootUsername ? `|${rootUsername}` : ""}$`)
    return username.match(regex)
}

userSchema.plugin(passportLocalMongoose, {
    usernameCaseInsensitive: true,
    usernameLowerCase: true,
    passwordValidator
})
userSchema.path("username").validate(usernameValidator)

module.exports = model("User", userSchema)
