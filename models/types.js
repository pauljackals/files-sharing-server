const { SchemaTypes } = require("../config/mongoose")
const {
    v4: uuidV4,
    validate: uuidValidate,
    version: uuidVersion
} = require("uuid")

const STRING = {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32
}
const BOOLEAN = {
    type: Boolean,
    required: true
}
const DATE = {
    type: Date,
    required: true,
    min: 1651504249,
    max: () => Date.now(),
    default: Date.now
}
const UUID = {
    type: String,
    required: true,
    unique: true,
    validate: uuid => uuidValidate(uuid) && uuidVersion(uuid)===4,
    default: uuidV4
}

const USER = {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
    unique: true
}
const CODE = {
    type: SchemaTypes.ObjectId,
    ref: "Code",
    required: true,
    unique: true
}

module.exports = {
    STRING,
    BOOLEAN,
    DATE,
    UUID,

    USER,
    CODE
}
