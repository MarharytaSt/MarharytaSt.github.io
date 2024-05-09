const nodeMailer = require('nodemailer');

function sendMail(
    toUser,
    subject,
    html) {
    const transporter = createTransporter('enzo12031999@gmail.com', 'bsug oyxc ipyy hzte');
    const mail = {
        to: toUser,
        subject: subject,
        html: html
    };

    return transporter.sendMail(mail);
}

function createTransporter(userEmail, userPassword) {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465
        auth: {
            user: userEmail,
            pass: userPassword
        },
    });

    return transporter;
}

// экспорт нашей функции
exports.sendMail = sendMail;