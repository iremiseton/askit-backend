const express = require("express");
const router = express.Router();

var _ = require("lodash");

var User = require("../../models/User");

router.route("/register")

    /*
        required in body:
        [
            username,
            password,
            email
        ]

        returns json formatted user data if successed

    */

    .post( (req, res) => {
        
        var body = _.pick(req.body, [
            "username",
            "password",
            "email"
        ]);

        User.createNewUser(
            body.username,
            body.password,
            body.email,
            (user, err) => {

                if (err) { return res.json({"error": err}) }
                return res.json(user);
            }
        )

    })

module.exports = router;