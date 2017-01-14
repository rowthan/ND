/**
 * Created by rowthan on 2016/4/20 0020.
 */
var nodemailer = require('nodemailer');
var emailConfig = require('../config/config').email;

exports.sendEmail = function (email, subject,text,done) {
    var transporter = nodemailer.createTransport({
        //service: 'SendGrid',
        host: "smtp.163.com",
        secureConnection: true,
        port: 465,
        auth: {
            user: emailConfig.auth.user,
            //process.env.SENDGRID_USER,
            pass: emailConfig.auth.pass
            //process.env.SENDGRID_PASSWORD
        }
    });
    var mailOptions = {
        to: email,
        from: emailConfig.auth.user,
        subject: subject,
        html: text
    };
    transporter.sendMail(mailOptions, function (err) {
        done(err);
    });
};