const { ValidationError, CastError } = require("../config/mongoose").Error
const {
    MissingPasswordError,
    MissingUsernameError,
    UserExistsError,
    IncorrectPasswordError,
    IncorrectUsernameError
} = require("passport-local-mongoose/lib/errors")
const AuthenticationError = require("passport/lib/errors/authenticationerror")
const { NotFoundError, MissingCredentialsError, AuthorizationError } = require("./errors")

const authenticateUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(new AuthenticationError("authentication fail"))
    }
    next()
}

const authorizeAdmin = (req, res, next) => {
    if(!req.user.admin) {
        return next(new AuthorizationError("authorization fail"))
    }
    next()
}

const handleUnknownRoutes = (req, res, next) => next(new NotFoundError("route not found"))

const handleErrors = (err, req, res, next) => {
    const sendResponse = (status, message) => res.status(status).json({message})

    if (
        err instanceof SyntaxError ||
        err instanceof CastError
    ) {
        sendResponse(400, "invalid request")

    } else if(err instanceof ValidationError) {
        sendResponse(422, "validation error")
    
    } else if(err instanceof AuthenticationError) {
        sendResponse(401, "unauthenticated")

    } else if(err instanceof AuthorizationError) {
        sendResponse(403, "unauthorized")

    } else if(err instanceof NotFoundError) {
        sendResponse(404, "resource not found")

    } else if(
        err instanceof MissingPasswordError ||
        err instanceof MissingUsernameError ||
        err instanceof MissingCredentialsError
    ) {
        sendResponse(422, "missing credentials")

    } else if (
        err instanceof IncorrectPasswordError ||
        err instanceof IncorrectUsernameError
    ) {
        sendResponse(409, "incorrect credentials")

    } else if(err instanceof UserExistsError) {
        sendResponse(409, "user exists")

    } else {
        sendResponse(500, "unknown error")
        console.error(err)
    }
}

module.exports = {
    authenticateUser,
    authorizeAdmin,
    handleUnknownRoutes,
    handleErrors
}
