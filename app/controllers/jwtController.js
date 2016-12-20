var jwt    = require('jsonwebtoken');
var config = require('../util/config');

//GET - Return token for use services
exports.generateToken = function(req, res) {
    
    var tokenUser = {
        id: '000'
    }
	var token = jwt.sign(tokenUser, config.jwt.secret, {
      expiresIn: '1h'
    });
    console.log('GET /objobs/v1/token/' + req.params.id);
    tokenUser.token = token;
    res.send(tokenUser);
};

//GET - Return token for use services
exports.resetToken = function(req, res) {

    if (req.params.id) {
        var tokenUser = {
            id: req.params.id,
            email: req.body.email
        }
        var token = jwt.sign(tokenUser, config.jwt.secret, {
          expiresIn: '1d' // espires in 24 hours
        });
        console.log('GET /objobs/v1/token/' + req.params.id);
        tokenUser.token = token;
        res.send(tokenUser);
    } else {
        res.send({ code: 1, desc: "ID company or user is required"});
    }
};