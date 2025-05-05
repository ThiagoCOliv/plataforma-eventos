require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT || 'mysql',
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_FROM_PASS,
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
}