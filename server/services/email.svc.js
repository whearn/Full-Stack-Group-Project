var helper = require('sendgrid').mail;
var subject = 'Sending with SendGrid is Fun';
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

//add receipt features to email 

exports.sendEmail = function(to, from, subject, content) {
    var fromEmail = new helper.Email(emailFrom);
    var toEmail = new helper.Email('cramerrachael@gmail.com');
    var content = new helper.Content('text/html', content);
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    return sg.API(request, function (error, response) {
        if (error) {
            console.log('Error response received');
        }
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });
}