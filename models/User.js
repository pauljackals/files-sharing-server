const { Schema, model, Error:{ValidationError} } = require("../config/mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const { BOOLEAN, USER, DATE } = require("./types")
const { rootUsername } = require("../config/constants")
const { autoSelect } = require("../utils/functions")

const userSchema = new Schema({
    admin: BOOLEAN,
    registration: DATE
})

const passwordValidator = (password, cb) => {
    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,256}$/)) {
        return cb(new ValidationError("password validation error"))
    }
    cb()
}
const usernameValidator = username => {
    const regex = new RegExp(`^([A-Za-z0-9]{1,32}|${rootUsername})$`)
    return username.match(regex)
}

userSchema.plugin(passportLocalMongoose, {
    usernameCaseInsensitive: true,
    usernameLowerCase: true,
    passwordValidator
})
userSchema.path("username").validate(usernameValidator)

const autoSelectSetup = autoSelect("-hash -salt")
userSchema.pre("findOneAndDelete", autoSelectSetup)

module.exports = model(USER.ref, userSchema)
