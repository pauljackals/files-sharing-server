const router = require("express").Router()
const dirTree = require("directory-tree")
const { sharedDirectory } = require("../config/constants")
const { NotFoundError } = require("../utils/errors")

router
    .get("/", (req, res, next) => {
        const directory = dirTree(sharedDirectory, {
            normalizePath: true,
            attributes: [
                "type",
                "size",
                "birthtime",
                "mtime"
            ]
        })
        if(!directory) {
            return next(new NotFoundError("shared directory not found"))
        }
        res.status(200).json({directory})

    })

module.exports = router
