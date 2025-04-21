require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env;

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT || 'mysql',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        paranoid: true
    }
});

const checkConnection = async () => {
    try 
    {
        console.log('Connecting to the database...');
        await connection.authenticate();
        console.log('Connection has been established successfully.');
        return true;
    } 
    catch (error) 
    {
        console.error('Unable to connect to the database:', error);
        return false;
    }
};

module.exports = checkConnection() ? connection : process.exit(1);