var jwt    = require('jsonwebtoken');
var config = require('../util/config');

//GET - Return token for use services
exports.generateToken = function(req, res) {

    if (req.params.id) {
        var tokenUser = {
            id: req.params.id,
            email: req.body.email
        }
        var expire = '1d'; // expires in 24 hours
    } else {
        var tokenUser = {
            id: 'invitado'
        }
        var expire = '12h'; // 
    }

	var token = jwt.sign(tokenUser, config.jwt.secret, {
      expiresIn: expire
    });
    console.log('GET /objobs/v1/token/' + req.params.id);
    tokenUser.token = token;
    res.send(tokenUser);
};
