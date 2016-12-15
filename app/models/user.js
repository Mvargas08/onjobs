var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	email: String,
	name: String,
	lastname: String,
	profession: String,
	position: String,
	experience: String,
	status: { type: Boolean, default: false },
	token: String
});

module.exports = mongoose.model('User', user);