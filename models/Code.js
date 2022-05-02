const { Schema, model } = require("../config/mongoose")
const { autoPopulate } = require("../utils/functions")
const { CODE, USER, UUID } = require("./types")

const codeSchema = new Schema({
    code: UUID,
    user: {
        ...USER,
        required: false,
        sparse: true
    }
})

const autoPopulateSetup = autoPopulate("user")
codeSchema.pre("find", autoPopulateSetup)
codeSchema.pre("findOne", autoPopulateSetup)

module.exports = model(CODE.ref, codeSchema)
