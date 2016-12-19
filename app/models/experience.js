var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var experience = new Schema({
	userID: String,
	companyName: String,
	title: String,
	location: String,
	date: Date,
	dateOut: Date,
	description: String
});

module.exports = mongoose.model('Experience', experience);