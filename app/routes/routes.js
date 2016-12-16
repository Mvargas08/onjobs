module.exports = function (app) {

	var UserController = require('../controllers/userController');
	var jwtController = require('../controllers/jwtController');

	app.get('/onjobs/v1/users', UserController.findAllUsers);
	app.post('/onjobs/v1/users', UserController.addUser);
	app.get('/onjobs/v1/users/:id', UserController.findById);
	app.put('/onjobs/v1/users/:id', UserController.updateUser);
	app.delete('/onjobs/v1/users/:id', UserController.deleteUser);

	app.post('/onjobs/v1/token/:id', jwtController.generateToken);
}