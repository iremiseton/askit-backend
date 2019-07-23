const express = require("express");
const router = express.Router();

var _ = require("lodash");

var User = require("../../models/User");

router.route("/login")

    /*
        Takes username & password as parameters and return 
        a token in a json format if username and password are correct
    */

    .post( (req, res) => {

        var body = _.pick(req.body, [
            "username",
            "password",
        ]);

        User.authenticate(body.username, body.password, (token, err) => {
            if (err) { return res.json({"error": err})}
            
                
            req.token = token;
            res.set('authorization', token);

            return res.json({token});
        })


    })

module.exports = router;