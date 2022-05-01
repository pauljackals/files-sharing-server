const cleanUser = user => {
    user.hash = undefined
    user.salt = undefined
}

module.exports = {
    cleanUser
}
