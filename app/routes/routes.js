module.exports = function (app) {

	var UserController = require('../controllers/userController');

	app.get('/onjobs/v1/users', UserController.findAllUsers);
	app.post('/onjobs/v1/users', UserController.addUser);
	app.get('/onjobs/v1/users/:id', UserController.findById);
	app.put('/onjobs/v1/users/:id', UserController.updateUser);
	app.delete('/onjobs/v1/users/:id', UserController.deleteUser);
}