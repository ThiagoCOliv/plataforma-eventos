console.log('Loading EventModel...');
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Events = sequelize.define('Events', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100]
        }
    },
    tag: {
        type: DataTypes.ENUM('educacional', 'profissional', 'social-cultural', 'esporte', 'tecnologia', 'bem-estar', 'outros'),
        defaultValue: 'outros'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            isTime: true
        }
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100]
        }
    },
    subscriptionsLimit: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true
        }
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    userId: {
        type: DataTypes.UUID,
        field: 'user_id'
    },
});

(async () => {
    await Events.sync();
    const User = require('./UserModel');
    User.hasMany(Events);
    Events.belongsTo(User, {
        foreignKey: 'userId',
        field: 'user_id',
        targetKey: 'id',
        allowNull: false,
        as: 'creator'
    });

    await sequelize.sync({ alter: true });
    module.exports = Events;
})();