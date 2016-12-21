var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	email: String,
	name: String,
	lastname: String,
	rut: String,
	birthdate: String,
	profession: String,
	experience: String,
	region: String,
	city: String,
	description: String,
	flag: { type: Boolean, default: false },
	recomendation: String,
	score: Number,
	status: { type: Boolean, default: false },
	token: String,
	provider: String,
	google: {
		id: String,
		token: String,
		email: String,
		name: String,
		lastname: String
	},
	linkedin: {
		id: String,
		token: String,
		email: String,
		name: String,
		lastname: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String,
		lastname: String
	}
});

module.exports = mongoose.model('User', user);