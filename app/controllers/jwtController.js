var jwt    = require('jsonwebtoken');
var config = require('../util/config');

//GET - Return token for use services
exports.generateToken = function(req, res) {

    var tokenUser = {
		id: req.params.id,
		email: req.body.email
	}
	var token = jwt.sign(tokenUser, config.jwt.secret, {
      expiresIn: '1d' // expires in 24 hours
    });
    console.log('GET /objobs/v1/token/' + req.params.id);
    tokenUser.token = token;
    res.send(tokenUser);
};
