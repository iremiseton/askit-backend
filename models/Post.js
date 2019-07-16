var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var fs = require("fs");
var multer = require("multer");

var post_schema = new Schema({

    owner_id: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String,
        trim: true
    },
    body: {
        required: true,
        type: String,
        trim: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

post_schema.statics.getPostById = function(_id) {
    return this.find({_id});
}


post_schema.statics.getNewestPosts = function(limit = 0) {
    if (limit == 0 || limit < 0) { return this.find().sort({createdAt: 1}) }
    return this.find().sort({createdAt: 1}).limit(limit);
}



var Post = mongoose.model("Post", post_schema);

module.exports = Post;