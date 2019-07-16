require("../config/config");

const mongoose = require("mongoose");

mongoose.connect(
	process.env.dbURL,
	{ useNewUrlParser: true },
	() => console.log("Connected to db") 
);
