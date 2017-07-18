var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

//add receipt features to email 

exports.sendEmail = function(to, from, subject, content) {
    var fromEmail = new helper.Email(from);
    var toEmail = new helper.Email(to);
    var content = new helper.Content('text/html', content);
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    return sg.API(request);
}