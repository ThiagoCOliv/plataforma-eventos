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

    async subscribeToEvent(eventId)
    {
        // Implement subscription logic here
    }
}

module.exports = EventRepository;