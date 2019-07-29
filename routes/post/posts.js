const express = require("express")
const router = express.Router()

var fs = require("fs")
var _ = require("lodash")

var upload = require("../../utils/uploadImage")
var Post = require("../../models/Post")

/*
    Get newest posts with or without limit
    @Params [
        "limit"
    ]

    Params are not required.

*/

router.route("/")

    .get( (req, res) => {

        var body = _.pick(req.body, [
            "limit",
        ])

        if (!body.limit) { body.limit = 0}

        Post.getNewestPosts(body.limit).
                        then( (_posts) => {
                            return res.json({_posts})
                        })
                        .catch( (err) => {
                            return res.json({err})
                        });
    })

    /*
        Uploading new post to database.

        @Params[
            "title",
            "body": Not required,
            "file": Not required
        ]
    */

    .post(upload.single("file"), (req, res) => {


        try {
            var filename = "./data/" + req.file.filename
        } catch {
            var filename = "undefined"
        }

        var body = _.pick(req.body, [
            "title",
            "body",
        ]);

        Post.createNewPost(req,
            body.title, //Title
            body.body,  //body
            filename,
            (err, result) => {
                if (err) {
                    return res.json({err})
                }

                return res.json({result})
            });
    })

module.exports = router