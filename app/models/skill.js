var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skill = new Schema({
	userID: String,
	name: String
});

module.exports = mongoose.model('Skill', skill);