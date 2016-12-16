var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var company = new Schema({
	email: String,
	name: String,
	phone: Number,
	businessName: String,
	rut: String,
	entry: String,
	businessTurn: String,
	region: String,
	city: String,
	location: String,
	flag: { type: Boolean, default: false },
	recomendation: String,
	status: { type: Boolean, default: false },
	token: String
});

module.exports = mongoose.model('Company', company);