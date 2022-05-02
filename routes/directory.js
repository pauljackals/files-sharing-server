const router = require("express").Router()
const dirTree = require("directory-tree")
const { sharedDirectory } = require("../config/constants")
const { NotFoundError } = require("../utils/errors")

router
    .get("/", (req, res, next) => {
        const files = dirTree(sharedDirectory, {
            normalizePath: true,
            attributes: [
                "type",
                "size",
                "birthtime",
                "mtime"
            ]
        })
        if(!files) {
            return next(new NotFoundError("shared directory not found"))
        }
        res.status(200).json({files})

    })

module.exports = router
