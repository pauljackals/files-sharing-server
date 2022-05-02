const cleanUser = user => {
    user.hash = undefined
    user.salt = undefined
}

const autoPopulate = field => function(next) {
    this.populate(field)
    next()
}
const autoSelect = field => function(next) {
    this.select(field)
    next()
}

module.exports = {
    cleanUser,
    autoPopulate,
    autoSelect
}
