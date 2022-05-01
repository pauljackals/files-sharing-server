const {Schema, model} = require("../config/mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({})

userSchema.plugin(passportLocalMongoose)

module.exports = model("User", userSchema)
