var jwt    = require('jsonwebtoken');
var config = require('../util/config');
var User = require('../models/user');

//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            User.find(function (err, users) {
                if(err) {
                    res.send({ code: 1, desc: err.message});
                } else {
                    if (users) {
                        console.log('GET /objobs/v1/user')
                        res.send(users);
                    } else {
                        res.send({ code: 2, desc: "Users doesn't exist"});
                    }
                }
            });
        }
    });
};

//GET - Return a User with specified ID
exports.findById = function(req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            User.findById(req.params.id, function (err, user) {
                if(err) {
                    res.send({ code: 1, desc: 'User ID not found :: ' + err.message});
                } else {
                    if (user) {
                        console.log('GET /objobs/v1/user/' + req.params.id);
                        res.send(user);
                    } else {
                        res.send({ code: 2, desc: "User doesn't exist"});
                    }
                }
            });
        }
    });
};

//POST - Insert a new User in the DB
exports.addUser = function(req, res) {

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            var user = new User({
                email: req.body.email,
                name: req.body.name,
                lastname: req.body.lastname,
                rut: req.body.rut,
                birthdate: req.body.birthdate,
                profession: req.body.profession,
                experience: req.body.experience,
                region: req.body.region,
                city: req.body.city,
                descripcion: req.body.descripcion,
                flag: req.body.flag,
                recomendation: req.body.recomendation,
                score: req.body.score
            });

            user.save(function (err, u) {
                if(err) res.send({ code: 1, desc: err.message});
                res.send(u);
            });
        }
    });
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
    
    var email = req.body.email || '';
    var name = req.body.name || '';
    var lastname = req.body.lastname || '';
    var rut = req.body.rut || '';
    var birthdate = req.body.birthdate || '';
    var profession = req.body.profession || '';
    var experience = req.body.experience || '';
    var region = req.body.region || '';
    var city = req.body.city || '';
    var descripcion = req.body.descripcion || '';
    var flag = req.body.flag || '';
    var recomendation = req.body.recomendation || '';
    var score = req.body.score || '';

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            var userID = req.params.id || '';

            if (userID.match(/^[0-9a-fA-F]{24}$/)) {
                User.findById(userID, function (err, user) {
                    if (!err && user) {

                        if (email != '') user.email = email;
                        if (name != '') user.name = name;
                        if (lastname != '') user.lastname = lastname;
                        if (rut != '') user.rut = rut;
                        if (birthdate != '') user.birthdate = birthdate;
                        if (profession != '') user.profession = profession;
                        if (experience != '') user.experience = experience;
                        if (region != '') user.region = region;
                        if (city != '') user.city = city;
                        if (descripcion != '') user.descripcion = descripcion;
                        if (flag != '') user.flag = flag;
                        if (recomendation != '') user.recomendation = recomendation;
                        if (score != '') user.score = score;

                        user.save(function (err, u) {
                            if(err) res.send({ code: 1, desc: err.message});
                            res.send(u);
                        });
                    } else {
                        res.send({ code: 2, desc: "User doesn't exist"});
                    }
                });
            } else {
                res.send({ code: 3, desc: 'User ID is required'});
            }

        }
    });
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            User.findById(req.params.id, function (err, user) {
                if (user) {
                    user.remove(function (err) {
                        if(err) res.send({ code: 1, desc: err.message});
                        res.send({ code: 0, desc: 'User deleted'});
                    });
                } else {
                    res.send({ code: 2, desc: "User doesn't exist"});
                }
            });
        }
    });
};

//POST - Report
exports.getReport = function(req, res) {

    var profession = req.body.profession || '';
    var position = req.body.position || '';
    var experience = req.body.experience || '';
    var numEmployees = req.body.numEmployees || '';
    var salary = req.body.salary || '';
    var city = req.body.city || '';

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            User.find({profession:profession, position:position, city:city}, function (err, users) {
                if (users) {
                    res.send(users);
                } else {
                    res.send({ code: 1, desc: "There are no users to compare"});
                }
            });
        }
    });
};
