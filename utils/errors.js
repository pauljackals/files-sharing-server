const createError = name => {
    function error(message) {
        const instance = new Error(message)
        instance.name = name
        Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
        return instance
    }
    error.prototype = Object.create(Error.prototype, {
        constructor: {
            value: error,
        },
    })
    return error
}

const notFoundError = "NotFoundError"
const missingCredentialsError = "MissingCredentialsError"
const authorizationError = "AuthorizationError"

module.exports = {
    [notFoundError]: createError(notFoundError),
    [missingCredentialsError]: createError(missingCredentialsError),
    [authorizationError]: createError(authorizationError)
}
