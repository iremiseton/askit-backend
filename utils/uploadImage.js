const multer = require("multer");

const Post = require("../models/Post");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./data");
    },
    filename: (req, file, cb) => {
        var filetype = file.mimetype.split("/")[1];
        cb(null, req.userData.user._id + "-" + Date.now() + "." + filetype);
    }
});

module.exports = multer({storage: storage});