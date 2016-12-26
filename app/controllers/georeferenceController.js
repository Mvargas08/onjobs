var jwt    = require('jsonwebtoken');
var Region = require('../models/region');
var City = require('../models/city');

//GET - Return all regions.
exports.getRegions = function(req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ code: 401, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;

            Region.find(function (err, regions) {
                if(err) {
                    res.status(500).send({ code: 500, desc: err.message});
                } else {
                    console.log('GET /onjobs/v1/regions/');
                    res.send(regions);
                }
            });
    });
};

//GET - Return all cities.
exports.getRegions = function(req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ code: 401, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;

            City.find(function (err, cities) {
                if(err) {
                    res.status(500).send({ code: 500, desc: err.message});
                } else {
                    console.log('GET /onjobs/v1/cities/');
                    res.send(cities);
                }
            });
    });
};