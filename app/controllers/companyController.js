var jwt    = require('jsonwebtoken');
var config = require('../util/config');
var User = require('../models/user');
var Company = require('../models/company');

//GET - Return all company in the DB
exports.findAllCompanys = function (req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function(err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            Company.find(function(err, companys) {
                if(err) {
                    res.send({ code: 1, desc: err.message});
                } else {
                    console.log('GET /objobs/v1/company')
                    res.send(companys);
                }
            });
        }
    });
};

//GET - Return a company with specified ID
exports.findCompanyById = function (req, res) {
    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function(err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            var companyId = req.params.id || '';
            if (companyId =! '') {
                Company.findById(companyId, function(err, company) {
                    if(err) {
                        res.send({ code: 1, desc: err.message});
                    } else {
                        console.log('GET /objobs/v1/company/' + companyId);
                        res.send(company);
                    }
                });
            } else {
                res.send({ code: 1, desc: 'Company ID is required'});
            }
        }
    });
};

//POST - Insert a new Company in the DB
exports.addCompany = function (req, res) {

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function(err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;

            encrypt.cryptPassword(req.body.password, function (err, hash) {
                if (!err && hash) {
                    var password =  hash;
                    var company = new Company ({
                        email: req.body.email,
                        password: password,
                        name: req.body.name,
                        phone: req.body.lastname,
                        businessName: req.body.businessName,
                        rut: req.body.rut,
                        entry: req.body.entry,
                        businessTurn: req.body.businessTurn,
                        region: req.body.region,
                        city: req.body.city,
                        location: req.body.location,
                        flag: req.body.flag,
                        recomendation: req.body.recomendation
                    });

                    company.save(function(err, c) {
                        if(err) res.send({ code: 1, desc: err.message});
                        res.send(c);
                    });
                } else {
                    res.send({ _id: 3, descripcion: 'Error encrypt password'});
                }
            });
        }
    });
};

//PUT - Update a register already exists
exports.updateCompany = function (req, res) {
    
    var email = req.body.email || '';
    var name = req.body.name || '';
    var phone = req.body.phone || '';
    var businessName = req.body.businessName || '';
    var rut = req.body.rut || '';
    var entry = req.body.entry || '';
    var businessTurn = req.body.businessTurn || '';
    var region = req.body.region || '';
    var city = req.body.city || '';
    var location = req.body.location || '';
    var flag = req.body.flag || '';
    var recomendation = req.body.recomendation || '';

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function(err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            var companyId = req.params.id || '';
            if (companyId =! '') {
                Company.findById(companyId, function(err, company) {
                
                    if (email != '') company.email = email;                
                    if (name != '') company.name = name;
                    if (phone != '') company.phone = phone;
                    if (businessName != '') company.businessName = businessName;
                    if (rut != '') company.rut = rut;
                    if (entry != '') company.entry = entry;
                    if (businessTurn != '') company.businessTurn = businessTurn;
                    if (region != '') company.region = region;
                    if (city != '') company.city = city;
                    if (location != '') company.location = location;
                    if (flag != '') company.flag = flag;
                    if (recomendation != '') company.recomendation = recomendation;

                    company.save(function(c) {
                        if(err) res.send({ code: 1, desc: err.message});
                        res.send(c);
                    });
                });
            } else {
                res.send({ code: 1, desc: 'Company ID is required'});
            }
        }
    });
};

//DELETE - Delete a Company with specified ID
exports.deleteCompany = function (req, res) {

    var token = req.headers.authorization;
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function(err, decoded) {
        if (err) {
          res.send({ _id: -1, descripcion: 'Fallo en la autenticación de Token (' + err.message + ')'});
          console.log('INFO: Fallo en la autenticación de Token: ' + err);
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            var companyId = req.params.id || '';
            if (companyId =! '') {
                Company.findById(companyId, function(err, company) {
                    if (company) {
                        company.remove(function(err) {
                            if(err) res.send({ code: 1, desc: err.message});
                            res.send({ code: 0, desc: 'Company deleted'});
                        });
                    } else {
                        res.send({ code: 2, desc: "Company don't exist"});
                    }
                });
            } else {
                res.send({ code: 1, desc: 'Company ID is required'});
            }
        }
    });
};


// POST - Login company
exports.companyLogin = function (req, res) {
            
    var body = req.body;
    var email = body.email;
    var password = body.password;

    var companyId = req.params.id || '';
    if (companyId != '') {
        Company.findById(companyId, function (err, company) {
            if (!err && company) {
                if (company.password != null) {
                    encrypt.comparePassword(password, company.password, function (err, isPasswordMatch) {
                        if (!err && isPasswordMatch) {
                            var comp = {
                                id: companyId,
                                email: company.email
                            }
                            var token = jwt.sign(comp, config.jwt.secret, {
                              expiresIn: '1d' // expires in 24 hours
                            });
                            company.token = token;
                            company.save(function (err, c) {
                                if (!err) {
                                    res.send(c);
                                } else {
                                    res.send({ _id: 0, descripcion: 'Token not save'});
                                    console.log('ERROR: ' + err);
                                }
                            });
                        } else {
                            res.send({ _id: 0, descripcion: 'Incorrect password'});
                        }
                    });
                } else {
                    res.send({ _id: 1, descripcion: 'Company password not found'});
                }
            } else {
                res.send({ _id: 2, descripcion: 'Company not exist'});
            }
        });
    } else {
        res.send({ code: 3, desc: 'Company ID is required'});
    }
};