var jwt    = require('jsonwebtoken');
var config = require('../util/config');
var User = require('../models/user');
var Company = require('../models/company');

//GET - Return all recommendations
exports.getRecommendations = function(req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            
            var recommend = new Array();
            var ind = 0;
            var callback = function (err, response) {
                
                if (response) {
                    recommend.push(response);
                    ind = ind + 1;
                }
                if (ind == 2) {
                    if (recommend.length != 0) {
                        console.log('GET /objobs/v1/recommend');
                        res.send({recomendations:recommend});
                    } else {
                        res.send({ code: 2, desc: "Recommendations not found"});
                    }
                }
            }
            User.find({flag: true}, callback);
            Company.find({flag: true}, callback);
        }
    });
};
