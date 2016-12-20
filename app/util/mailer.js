var nodemailer = require('nodemailer');
var config = require('./config.js');

exports.sendMailResetPassword = function (company, psw) {
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://'+ config.mail.user +':'+ config.mail.pass +'@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '"OnJobs " <'+ config.mail.user +'>', // sender address
	    to: company.email + ', ' + config.mail.admin, // list of receivers
	    subject: 'OnJobs - Nueva contraseña', // Subject line
	    html: 'Hola, ' + Company.businessName + '<br/>' +
	    	  '<b> Su contraseña ha cambiado, ahora es:  </b>' + psw // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(err, info) {
	    if (!err) {
	        console.log('LOG: Se envio correo de reset password ' + info.response);
	    } else {
	    	console.log('ERROR: No se pudo enviar correo de reset password ' + err);
	    }
	});
}