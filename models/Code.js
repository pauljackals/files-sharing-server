const { Schema, model } = require("../config/mongoose")
const { CODE, USER, UUID } = require("./types")

const codeSchema = new Schema({
    code: UUID,
    user: {
        ...USER,
        required: false
    }
})

module.exports = model(CODE.ref, codeSchema)
