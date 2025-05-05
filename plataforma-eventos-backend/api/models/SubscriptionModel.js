const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Subscriptions = sequelize.define('Subscriptions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    eventId: {
        type: DataTypes.UUID,
        field: 'event_id',
        allowNull: false,
        references: {
            model: 'Events',
            key: 'id'
        }
    },
    subscriberName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'subscriber_name',
        validate: {
            len: [3, 100]
        }
    },
    subscriberEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'subscriber_email',
        validate: {
            isEmail: true
        }
    },
    companionsNumber: {
        type: DataTypes.INTEGER,
        field: 'companions_number',
        validate: {
            isInt: true
        }
    },
});

(async () => await Subscriptions.sync())();

module.exports = Subscriptions;