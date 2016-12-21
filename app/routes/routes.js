module.exports = function (app, passport) {

	var UserController = require('../controllers/userController');
	var CompanyController = require('../controllers/companyController');
	var ExperienceController = require('../controllers/experienceController');
	var StudyController = require('../controllers/studyController');
	var Recommend = require('../controllers/recommendController');
	var jwtController = require('../controllers/jwtController');

	// Usuarios
	app.get('/onjobs/v1/users', UserController.findAllUsers);
	app.post('/onjobs/v1/users', UserController.addUser);
	app.get('/onjobs/v1/users/:id', UserController.findById);
	app.put('/onjobs/v1/users/:id', UserController.updateUser);
	app.delete('/onjobs/v1/users/:id', UserController.deleteUser);

	// Reporte
	app.post('/onjobs/v1/users/report', UserController.getReport);

	// Recomiendan
	app.get('/onjobs/v1/recommend', Recommend.getRecommendations);

	// Curriculum Vitae - Experiencia
	app.get('/onjobs/v1/cv/experience/user/:id', ExperienceController.findExpByIdUser);
	app.post('/onjobs/v1/cv/experience/user/:id', ExperienceController.addExpUser);
	app.get('/onjobs/v1/cv/experience/:id', ExperienceController.findExpById);
	app.put('/onjobs/v1/cv/experience/:id', ExperienceController.updateExpUser);
	app.delete('/onjobs/v1/cv/experience/:id', ExperienceController.deleteExpUser);

	// Curriculum Vitae - Estudios
	app.get('/onjobs/v1/cv/studies/user/:id', StudyController.findStudiesByIdUser);
	app.post('/onjobs/v1/cv/studies/user/:id', StudyController.addStudiesUser);
	app.get('/onjobs/v1/cv/studies/:id', StudyController.findStudiesById);
	app.put('/onjobs/v1/cv/studies/:id', StudyController.updateStudiesUser);
	app.delete('/onjobs/v1/cv/studies/:id', StudyController.deleteStudiesUser);

	// Empresas
	app.get('/onjobs/v1/company', CompanyController.findAllCompanys);
	app.post('/onjobs/v1/company', CompanyController.addCompany);
	app.post('/onjobs/v1/company/login', CompanyController.companyLogin);
	app.post('/onjobs/v1/company/resetPassword', CompanyController.resetPassword);
	app.get('/onjobs/v1/company/:id', CompanyController.findCompanyById);
	app.put('/onjobs/v1/company/:id', CompanyController.updateCompany);
	app.delete('/onjobs/v1/company/:id', CompanyController.deleteCompany);

	// Json Web Token
	app.post('/onjobs/v1/token/:id', jwtController.resetToken);
	app.get('/onjobs/v1/token', jwtController.generateToken);

	// Google Authentication
    app.get('/onjobs/v1/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/onjobs/v1/auth/google/callback', passport.authenticate('google'), jwtController.generateSocialTokenUser);

    // Linkedin Authentication
    app.get('/onjobs/v1/auth/linkedin',passport.authenticate('linkedin'));
	app.get('/onjobs/v1/auth/linkedin/callback', passport.authenticate('linkedin'), jwtController.generateSocialTokenUser);

    // Facebook Authentication
    app.get('/onjobs/v1/auth/facebook', passport.authenticate('facebook'));
	app.get('/onjobs/v1/auth/facebook/callback',passport.authenticate('facebook'), jwtController.generateSocialTokenUser);
};