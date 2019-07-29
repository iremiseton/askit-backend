require("./config/config");

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 5000;

//Connect to db
var mongoose = require("./db/connectToDb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cors = require("cors");


var whitelist = process.env.CORSwl;
var corsOpt = {
    origin: function(origin, cb) {
        if (whitelist.indexOf(origin) !== -1) {
            cb(null, true);
        } else {
            cb(new Error("Not allowed by CORS"))
        }
    }
}

app.use(cors(corsOpt));

//Middlewares
var verifyToken = require("./middleware/verifyToken");

app.use("/auth", require("./routes/auth/register")); //Register user route
app.use("/auth", require("./routes/auth/login"));

app.use("/p", require("./routes/post/posts"));
app.use("/i", require("./routes/post/image"));

app.use("/admin", require("./routes/admin/modifyUser"));

server.listen(port, () => {
    console.log("Server is running on port: " + port);
});