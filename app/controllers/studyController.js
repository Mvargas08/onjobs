var jwt    = require('jsonwebtoken');
var config = require('../util/config');
var User = require('../models/user');
var Study = require('../models/study');

//GET - Return all user experiences.
exports.findStudiesByIdUser = function(req, res) {
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
                Study.find({userID: userID}, function (err, study) {
                    if(err) {
                        res.status(500).send({ code: 500, desc: err.message});
                    } else {
                        console.log('GET /onjobs/v1/cv/studies/user/'+ req.params.id);
                        res.send(study);
                    }
                });
            } else {
                res.status(400).send({ code: 400, desc: 'User ID valided is required'});
            }
        }
    });
};

//GET - Return an user experience
exports.findStudiesById = function(req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ code: 401, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            Study.findById(req.params.id, function (err, st) {
                if(err) {
                    res.status(404).send({ code: 404, desc: 'Study ID not found :: ' + err.message});
                } else {
                    if (st) {
                        console.log('POST /onjobs/v1/cv/experience/user/'+ req.params.id);
                        res.send(st);
                    } else {
                        res.status(404).send({ code: 404, desc: "Experience doesn't exist"});
                    }
                }
            });
        }
    });
};

//POST - Insert a new User experience in the DB
exports.addStudiesUser = function(req, res) {

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
                var study = new Study ({
                    userID: userID,
                    college: req.body.college,
                    date: req.body.date,
                    title: req.body.title,
                    titration: req.body.titration,
                    discipline: req.body.discipline,
                    average: req.body.average,
                    activities: req.body.activities
                });

                study.save(function (err, st) {
                    if(err) res.status(500).send({ code: 500, desc: err.message});
                    res.send(st);
                });
            } else {
                res.status(400).send({ code: 400, desc: 'User ID is required'});
            }
        }
    });
};

//PUT - Update a register already exists
exports.updateStudiesUser = function(req, res) {
    
    var college = req.body.college || '';
    var date = req.body.date || '';
    var title = req.body.title || '';
    var titration = req.body.titration || '';
    var discipline = req.body.discipline || '';
    var average = req.body.average || '';
    var activities = req.body.activities || '';

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
                Study.findById(expID, function (err, study) {
                    if (!err && study) {
                        
                        if (college != '') study.college = college;
                        if (date != '') study.date = date;
                        if (title != '') study.title = title;
                        if (titration != '') study.titration = titration;
                        if (discipline != '') study.discipline = discipline;
                        if (average != '') study.average = average;
                        if (activities != '') study.activities = activities;

                        study.save(function (err, e) {
                            if(err) res.status(500).send({ code: 500, desc: err.message});
                            res.send(e);
                        });
                    } else {
                        res.status(404).send({ code: 404, desc: "Experience doesn't exist"});
                    }
                });
            } else {
                res.status(400).send({ code: 400, desc: "Study ID is required or doesn't exist"});
            }

        }
    });
};

//DELETE - Delete a User experience with specified ID
exports.deleteStudiesUser = function(req, res) {

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ code: 401, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            Study.findById(req.params.id, function (err, study) {
                if (study) {
                    study.remove(function (err) {
                        if(err) res.status(500).send({ code: 500, desc: err.message});
                        res.send({ code: 0, desc: 'Experience deleted'});
                    });
                } else {
                    res.status(404).send({ code: 404, desc: "Experience doesn't exist"});
                }
            });
        }
    });
};