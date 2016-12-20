var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var region = new Schema({
	regionID: String,
	name: String
});

module.exports = mongoose.model('Region', region);