var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var study = new Schema({
	userId: String,
	college: String,
	date: String,
	titration: String,
	discipline: String,
	average: String,
	activities: String
});

module.exports = mongoose.model('Study', study);