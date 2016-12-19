module.exports = function (app) {

	var UserController = require('../controllers/userController');
	var CompanyController = require('../controllers/companyController');
	var ExperienceController = require('../controllers/experienceController');
	var jwtController = require('../controllers/jwtController');

	app.get('/onjobs/v1/users', UserController.findAllUsers);
	app.post('/onjobs/v1/users', UserController.addUser);
	app.get('/onjobs/v1/users/:id', UserController.findById);
	app.put('/onjobs/v1/users/:id', UserController.updateUser);
	app.delete('/onjobs/v1/users/:id', UserController.deleteUser);

	app.get('/onjobs/v1/cv/experience/user/:id', ExperienceController.findExpByIdUser);
	app.post('/onjobs/v1/cv/experience/user/:id', ExperienceController.addExpUser);
	app.get('/onjobs/v1/cv/experience/:id', ExperienceController.findExpById);
	app.put('/onjobs/v1/cv/experience/:id', ExperienceController.updateExpUser);
	app.delete('/onjobs/v1/cv/experience/:id', ExperienceController.deleteExpUser);

	app.get('/onjobs/v1/company', CompanyController.findAllCompanys);
	app.post('/onjobs/v1/company', CompanyController.addCompany);
	app.get('/onjobs/v1/company/:id', CompanyController.findCompanyById);
	app.put('/onjobs/v1/company/:id', CompanyController.updateCompany);
	app.delete('/onjobs/v1/company/:id', CompanyController.deleteCompany);
	app.post('/onjobs/v1/company/:id/login', CompanyController.companyLogin);

	app.post('/onjobs/v1/token/:id', jwtController.generateToken);
	app.get('/onjobs/v1/token/', jwtController.generateToken);
}