const jwt = require("jsonwebtoken");

var verifyToken = function(req, res, next) {

    const token = req.headers['authorization'] || req.body.token;

    if (typeof token !== "undefined") {
        //Set token to token value from header
        req.token = token;

        //Set USER token to user from authData
        jwt.verify(
            token,
            process.env.jwtKey,
            (err, authData) => {
                if (err) { return res.json({error: err})}
                req.userData = authData;
                next();
            });
    } else { return res.json({error: "Unauthorized"})}
}

module.exports = verifyToken;