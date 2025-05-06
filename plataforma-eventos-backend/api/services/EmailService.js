const nodemailer = require('nodemailer');
const { email } = require('../../config/config');

async function sendEmail(to, subject, html)
{
    const transporter = nodemailer.createTransport({
        host: email.host,
        port: email.port,
        secure: false,
        auth: email.auth
    });
    
    try 
    {
        const info = await transporter.sendMail({ from: email.auth.user, to, subject, html });

        transporter.close();
    
        return true;
    }
    catch (error) 
    {
        console.error("Error sending email:", error);
        return false;
    }
}

const sendValidationEmail = async (user, validationNumber) => {
    const subject = "Número de validação de conta";
    const html = `<p>Olá ${ user.name },</p><p>Seu número de validação é: <strong>${ validationNumber }</strong></p><p>Atenciosamente,</p><p>Equipe Synera.</p>`;

    return await sendEmail(user.email, subject, html);
}


module.exports = {
    sendValidationEmail,
};