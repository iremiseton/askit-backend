const express = require("express");
const router = express.Router();

var _ = require("lodash");

var User = require("../../models/User");

router.route("/user")

    /*
        Takes username & password as parameters and return 
        a token in a json format if username and password are correct
    */

    .get( (req, res) => {

        var body = _.pick(req.body, [
            "username",
            "email"
        ])

        User.find({ $or: [
            {username: body.username},
            {email: body.email}
        ]})
        .then( (user) => {
            return res.json({user})
        })
        .catch( (err) => {
            return res.json({err})
        })

    })

module.exports = router;