var jwt    = require('jsonwebtoken');
var config = require('../util/config');
var User = require('../models/user');
var Experience = require('../models/experience');

//GET - Return all user experiences.
exports.findExpByIdUser = function(req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ code: 401, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;

            var userID = req.params.id || '';
            if (userID.match(/^[0-9a-fA-F]{24}$/)) {
                Experience.find({userID: userID}, function (err, experiences) {
                    if(err) {
                        res.status(500).send({ code: 500, desc: err.message});
                    } else {
                        console.log('GET /onjobs/v1/cv/experience/user/'+ req.params.id);
                        res.send(experiences);
                    }
                });
            } else {
                res.status(400).send({ code: 400, desc: 'User ID valided is required'});
            }
        }
    });
};

//GET - Return an user experience
exports.findExpById = function(req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ code: 401, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            Experience.findById(req.params.id, function (err, exp) {
                if(err) {
                    res.status(404).send({ code: 404, desc: 'Experience ID not found :: ' + err.message});
                } else {
                    if (exp) {
                        console.log('POST /onjobs/v1/cv/experience/user/'+ req.params.id);
                        res.send(exp);
                    } else {
                        res.status(404).send({ code: 404, desc: "Experience doesn't exist"});
                    }
                }
            });
        }
    });
};

//POST - Insert a new User experience in the DB
exports.addExpUser = function(req, res) {

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ code: 401, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;

            var userID = req.params.id || '';
            if (userID.match(/^[0-9a-fA-F]{24}$/)) {
                var experience = new Experience ({
                    userID: userID,
                    companyName: req.body.companyName,
                    title: req.body.title,
                    location: req.body.location,
                    date: req.body.date,
                    dateOut: req.body.dateOut,
                    description: req.body.description
                });

                experience.save(function (err, exp) {
                    if(err) res.status(500).send({ code: 500, desc: err.message});
                    res.send(exp);
                });
            } else {
                res.status(400).send({ code: 400, desc: 'User ID is required'});
            }
        }
    });
};

//PUT - Update a register already exists
exports.updateExpUser = function(req, res) {
    
    var companyName = req.body.companyName || '';
    var title = req.body.title || '';
    var location = req.body.location || '';
    var date = req.body.date || '';
    var dateOut = req.body.dateOut || '';
    var description = req.body.description || '';

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ code: 401, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            var expID = req.params.id || '';

            if (expID.match(/^[0-9a-fA-F]{24}$/)) {
                Experience.findById(expID, function (err, exp) {
                    if (!err && exp) {

                        if (companyName != '') exp.companyName = companyName;
                        if (title != '') exp.title = title;
                        if (location != '') exp.location = location;
                        if (date != '') exp.date = date;
                        if (dateOut != '') exp.dateOut = dateOut;
                        if (description != '') exp.description = description;

                        exp.save(function (err, e) {
                            if(err) res.status(500).send({ code: 500, desc: err.message});
                            res.send(e);
                        });
                    } else {
                        res.status(404).send({ code: 404, desc: "Experience doesn't exist"});
                    }
                });
            } else {
                res.status(404).send({ code: 404, desc: "Experience ID is required or doesn't exist"});
            }

        }
    });
};

//DELETE - Delete a User experience with specified ID
exports.deleteExpUser = function(req, res) {

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ code: 401, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            Experience.findById(req.params.id, function (err, exp) {
                if (exp) {
                    exp.remove(function (err) {
                        if(err) res.status(500).send({ code: 500, desc: err.message});
                        res.send({ code: 200, desc: 'Experience deleted'});
                    });
                } else {
                    res.status(404).send({ code: 404, desc: "Experience doesn't exist"});
                }
            });
        }
    });
};