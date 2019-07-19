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

//Middlewares
var verifyToken = require("./middleware/verifyToken");

app.use("/auth", require("./routes/auth/register")); //Register user route
app.use("/auth", require("./routes/auth/authenticate"));

app.use("/post", verifyToken, require("./routes/post/post"));

app.use("/admin", require("./routes/admin/user"));

server.listen(port, () => {
    console.log("Server is running on port: " + port);
});