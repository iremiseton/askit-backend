var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var user_schema = new Schema({
    username: {
        required: true,
        type: String,
        trim: true
    },
    username_lower: {
        required: true,
        type: String,
        lowercase: true,
        trim: true
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        trim: true
    },
    email_lower: {
        required: true,
        type: String,
        lowercase: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        default: "normal"
    },
    token: {
        default: null,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

user_schema.statics.findByUsername = function(username) {    
    return this.findOne({ username });
}

user_schema.statics.authenticate = function(
    username,
    password,
    cb
) {

    this.findOne({username})
        .then( (user) => {
            
            if (!user) { return cb(undefined, "Could not authenticate(1)")}
            
            bcrypt.compare(password, user.password, function(err, hash) {

                if (err) { return cb(undefined, err); }

                if (hash) {
                    jwt.sign({user}, 
                        process.env.jwtKey, 
                        (err, token) => {

                            if (err) { return cb(undefined, err)}
                            if (token) { return cb(token, undefined)}
                    })    
                } else { return cb(undefined, "Error with system")}
            })
        })
        .catch( (err) => {
            return cb(undefined, err);
        })

}

user_schema.statics.createNewUser = function(
    username,
    password,
    email,
    cb
) {

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

    var newUser = new this({
        username: username,
        username_lower: username.toLowerCase(),
        password: hashPassword,
        email: email,
        email_lower: email.toLowerCase()
    });

    newUser.save()
        .then( (user) => {
            cb(user, undefined);
        })
        .catch( (err) => {
            cb(undefined, err);
        });
}

var User = mongoose.model("User", user_schema)

module.exports = User; 

