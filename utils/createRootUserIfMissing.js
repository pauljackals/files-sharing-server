const { rootUsername, rootPassword } = require("../config/constants")
const User = require("../models/User")

const createRootUserIfMissing = () => {
    const handleError = err => console.error("Root user creation error\n", err)

    const username = rootUsername
    const password = rootPassword
    const admin = true

    User.findByUsername(username).exec()
        .then(user => {
            if(!user) {
                const user = new User({
                    username,
                    admin
                })
                User.register(user, password, (err, user) => {
                    if(err) {
                        return handleError(err)
                    }
                    console.log(`Root user "${user.username}" created`)
                })
            }
        })
        .catch(handleError)
}

module.exports = createRootUserIfMissing
