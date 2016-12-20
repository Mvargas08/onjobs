module.exports = {

	// JWT
	jwt: {
		secret: 'onjobs'
	},

	// Credenciales Autenticación
	googleAuth:{
		clientID: '599947091875-4f2jshhul271ro8l1d0ke7cvfjs5prd5.apps.googleusercontent.com',
		clientSecret: 'uSc-lMn6fbWvA5_poFXOsXqj',
		callbackURL: 'http://localhost:10010/auth/google/callback'
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
};