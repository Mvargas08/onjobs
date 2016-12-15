var mongoose = require('mongoose');  
var User = require('../models/user');

//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {  
    User.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /objobs/v1/user')
        res.send(users);
    });
};

//GET - Return a User with specified ID
exports.findById = function(req, res) {  
    User.findById(req.params.id, function(err, user) {
    if(err) return res.send(500, err.message);

    console.log('GET /objobs/v1/user/' + req.params.id);
        res.send(user);
    });
};

//POST - Insert a new User in the DB
exports.addUser = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var user = new User({
        email:    req.body.email,
        name:     req.body.name,
        lastname:  req.body.lastname,
        profession:   req.body.profession,
        position:  req.body.position,
        experience:    req.body.experience
    });

    user.save(function(err, u) {
        if(err) return res.status(500).send( err.message);
        res.send(u);
    });
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {  
    User.findById(req.params.id, function(err, user) {
        user.email   = req.body.email;
        user.name    = req.body.name;
        user.lastname = req.body.lastname;
        user.profession  = req.body.profession;
        user.position = req.body.position;
        user.experience   = req.body.experience;

        user.save(function(err) {
            if(err) return res.status(500).send(err.message);
      		res.send(user);
        });
    });
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {  
    User.findById(req.params.id, function(err, user) {
        if (user) {
            user.remove(function(err) {
                if(err) return res.status(500).send(err.message);
                res.send({ code: 0, desc: 'User deleted'});
            });
        } else {
            res.send({ code: 1, desc: "User don't exist"});
        }
    });
};