const EventModel = require('../models/EventModel');

class EventRepository
{
    async create(eventData)
    {
        return await EventModel.create(eventData);
    }

    async getEvents()
    {
        return await EventModel.findAll();
    }

    async getEventById(id)
    {
        return await EventModel.findOne({ where: { id } });
    }

    async getEventsByUserId(userId)
    {
        return await EventModel.findAll({ where: { userId } });
    }

    async updateEvent(id, eventData)
    {
        return await EventModel.update(eventData, {
            where: { id },
        });
    }

    async subscribeToEvent(event, subscribersNumber)
    {
        return await EventModel.update({ subscriptionsLimit: event.subscriptionsLimit - subscribersNumber }, {
            where: { id: event.id },
        });
    }
}

module.exports = EventRepository;