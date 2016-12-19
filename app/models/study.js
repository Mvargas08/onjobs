var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var study = new Schema({
	userID: String,
	college: String,
	date: Date,
	titration: String,
	discipline: String,
	average: String,
	activities: String
});

module.exports = mongoose.model('Study', study);