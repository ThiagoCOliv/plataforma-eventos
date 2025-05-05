const nodemailer = require('nodemailer');
const { email } = require('../../config/config');

async function sendEmail(user) 
{
    const transporter = nodemailer.createTransport({
        host: email.host,
        port: email.port,
        secure: false,
        auth: email.auth
    });
    
    try 
    {
        const info = await transporter.sendMail({
            from: email.auth.user,
            to: user.email,
            subject: "Número de validação de conta",
            html: `<p>Olá ${ user.name },</p><p>Seu número de validação é: <strong>${ user.validationNumber }</strong></p><p>Atenciosamente,</p><p>Equipe Synera.</p>`
        });

        transporter.close();
    
        return true;
    }
    catch (error) 
    {
        console.error("Error sending email:", error);
        return false;
    }
}

module.exports = {
    sendEmail,
};