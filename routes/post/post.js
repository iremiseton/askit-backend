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


        var body = _.pick(req.body, [
            "title",
            "body",
        ]);

        Post.createNewPost(req,
            body.title, //Title
            body.body,  //body
            req.file.filename ? "./data/" + req.file.filename : undefined, //filename path
            (err, result) => {
                if (err) {
                    return res.json({err});
                }

                return res.json({result});
            });
    })

module.exports = router;