module.exports = function (app) {

	var UserController = require('../controllers/userController');
	var companyController = require('../controllers/companyController');
	var jwtController = require('../controllers/jwtController');

	app.get('/onjobs/v1/users', UserController.findAllUsers);
	app.post('/onjobs/v1/users', UserController.addUser);
	app.get('/onjobs/v1/users/:id', UserController.findById);
	app.put('/onjobs/v1/users/:id', UserController.updateUser);
	app.delete('/onjobs/v1/users/:id', UserController.deleteUser);

	app.get('/onjobs/v1/company', companyController.findAllCompanys);
	app.post('/onjobs/v1/company', companyController.addCompany);
	app.get('/onjobs/v1/company/:id', companyController.findCompanyById);
	app.put('/onjobs/v1/company/:id', companyController.updateCompany);
	app.delete('/onjobs/v1/company/:id', companyController.deleteCompany);
	app.post('/onjobs/v1/company/:id/login', companyController.companyLogin);

	app.post('/onjobs/v1/token/:id', jwtController.generateToken);
}