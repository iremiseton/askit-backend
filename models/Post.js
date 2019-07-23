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
        type: String,
        trim: true
    },
    imgPath: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

post_schema.statics.getPostById = function(_id) {
    return this.findOne({_id});
}


post_schema.statics.getNewestPosts = function(limit = 0) {
    if (limit == 0 || limit < 0) { return this.find().sort({createdAt: 1}) }
    return this.find().sort({createdAt: 1}).limit(limit);
}

post_schema.statics.getImageURL = function(_id) {
    return this.findOne( { _id }, {imgPath: 1, _id: 0} );
}

post_schema.statics.createNewPost = function(req,
    title,
    body,
    imgPath,
    cb
    ) {

    var newPost = this({
        owner_id: req.userData.user._id,
        body,
        title,
        imgPath
    })

    newPost.save()
        .then( (result) =>{
            cb(undefined, result)
        })
        .catch( (err) => {
            cb(err, undefined);
        })
}

var Post = mongoose.model("Post", post_schema);

module.exports = Post;