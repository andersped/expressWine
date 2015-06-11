var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/wine_app");

module.exports.Wine = require("./wine")