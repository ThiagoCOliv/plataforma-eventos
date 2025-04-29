const nodemailer = require('nodemailer');

async function sendEmail(user) 
{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_FROM_PASS,
        },
    });
    
    try 
    {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
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