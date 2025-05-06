const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const bcrypt = require('bcryptjs');

const User = sequelize.define('Users',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100]
            }
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'pending'),
            defaultValue: 'pending'
        }
    }
);

User.beforeCreate(async (user) => user.password = await bcrypt.hash(user.password, 8));
User.prototype.checkPassword = (pass) => bcrypt.compare(pass, this.password);

(async () => await User.sync())();

module.exports = User;