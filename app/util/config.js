module.exports = {

	// JWT
	jwt: {
		secret: 'onjobs'
	},

	// Encriptador de contraseñas
	bcrypt: {
		rounds: 10
	},

	// Servicio de correo
	mail: {
		user: 'manuelvargasmejia@gmail.com',
		pass: 'davidvargas+08',
		admin: 'mvargas@formax.cl'
	},

	// Development Environment
	development: {
		port: '3000',
		database: {
			host: 'localhost',
			name: 'onJobs'
		}
	},

	// Production Environment
	production: {
		port: '8084',
		database: {
			user: 'admin',
			pass: 'qpalwosk10',
			host: 'ds145178.mlab.com',
			port: '45178',
			name: 'onjobs-prod'
		}
	}
};