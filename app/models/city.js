var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var city = new Schema({
	cityID: String,
	name: String,
	regionID: String
});

module.exports = mongoose.model('City', city);