var mongoose = require("mongoose");

var wineSchema = new mongoose.Schema({
	varietal: String,
	vintage: String,
	color: String,
	appelation: String,
	img: String
});

var Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;