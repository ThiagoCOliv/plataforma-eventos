require('dotenv').config();
const { Sequelize } = require('sequelize');
const { db } = require('../config/config');

const connection = new Sequelize(db.name, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
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