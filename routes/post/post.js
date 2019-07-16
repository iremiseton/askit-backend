const express = require("express");
const router = express.Router();

var fs = require("fs");
var _ = require("lodash");

var upload = require("../../utils/uploadImage");
var Post = require("../../models/Post");


router.route("/posts")

    .get( (req, res) => {

        var body = _.pick(req.body, [
            "username",
            "id",
            "email",
            "limit",
        ])

        if (!body.limit) { body.limit = 0}

        Post.getNewestPosts(body.limit).
                        then( (_posts) => {
                            return res.json({_posts})
                        })
                        .catch( (err) => {
                            return res.json({err})
                        })

    })

    .post(upload.single("file"), (req, res) => {

        if (!req.file) {
            return res.json({"error": "File was not found"});
        }

        return res.json({fileUrl: req.file.filename});
    })

module.exports = router;