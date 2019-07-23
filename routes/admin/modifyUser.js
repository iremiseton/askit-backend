const express = require("express");
const router = express.Router();

var _ = require("lodash");

var User = require("../../models/User");
var Post = require("../../models/Post");

router.route("/user")

    /*
        Takes username & password as parameters and return 
        a token in a json format if username and password are correct
    */

    .get( (req, res) => {

        Post.collection.drop();
        return res.json({"error": "deleted"});
        

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


    /*
        Modify user
    */

    .post( (req, res) => {
    
        var body = _.pick(req.body, [
            "id",
            "username",
            "password",
            "email"
        ]);

        User.findById(body.id, (err, user) => {

            if (err) { return res.json({err})}

            if (body.username) { 
                user.username = body.username;
                user.lower_username = body.username.toLowerCase();
            }

            if (body.password) { user.password = body.password; }

            if (body.email)    { 
                user.email = body.email;
                user.lower_email = body.email.toLowerCase();
            }

            user.save()
                .then( (result) => {
                    return res.json({result});
                })
                .catch( (error) => {
                    return res.json({error});
                });
        })
    })

module.exports = router;