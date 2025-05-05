const EventRepository = require('../repositories/EventRepository');
const eventRepository = new EventRepository();

const createEvent = async (eventInfo) => await eventRepository.create(eventInfo);
const getEvents = async () => await eventRepository.getEvents();
const getEventById = async (id) => await eventRepository.getEventById(id);

const subscribeToEvent = async (eventId, subscribersNumber) => {
    try 
    {
        const event = await eventRepository.getEventById(eventId);
        if (!event) throw new Error('Event not found');
        if (event.subscriptionsLimit < subscribersNumber) throw new Error('Event subscriptions limit reached');

        const eventSubscribed = await eventRepository.subscribeToEvent(event, subscribersNumber);
        if (!eventSubscribed) throw new Error('Failed to subscribe to event');

        return true;
    }
    catch (error) 
    {
        console.error("Error subscribing to event:", error);
        return false;
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    subscribeToEvent
};