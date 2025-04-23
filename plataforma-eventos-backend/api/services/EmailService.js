const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_FROM_PASS,
    },
});

async function sendEmail(user) 
{
    try 
    {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Número de validação de conta",
            html: `<p>Olá ${ user.nome },</p><p>Seu número de validação é: <strong>${ user.validationNumber }</strong></p><p>Atenciosamente,</p><p>Equipe Synera.</p>`
        });
    
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