const express = require("express");
const router = express.Router();

var fs = require("fs");
var _ = require("lodash");
var path = require('path');

var Post = require("../../models/Post");

router.route("/:id")

    .get( (req, res) => {

        //Checks if id is provided by user, sends json formattet error to user.
        if (!req.params.id) { return res.json({"Error": "ID is required"})}

        Post.getImageURL(req.params.id)
        .then( (result) => {
            return res.sendFile(path.resolve(__dirname + "../../../" + result.imgPath));
        })
        .catch( (err) => {
            return res.send(err);
        })
     

    })

   

module.exports = router;