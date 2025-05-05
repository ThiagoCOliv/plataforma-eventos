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
        field: 'event_id'
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

(async () => {
    await Subscriptions.sync();
    const Event = require('./EventModel');
    Event.hasMany(Subscriptions);
    Subscriptions.belongsTo(Event, {
        foreignKey: 'eventId',
        field: 'event_id',
        targetKey: 'id',
        allowNull: false,
        as: 'event'
    });

    await sequelize.sync({ alter: true });
    module.exports = Subscriptions;
})();