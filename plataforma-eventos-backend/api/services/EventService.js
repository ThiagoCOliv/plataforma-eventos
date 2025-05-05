const EventRepository = require('../repositories/EventRepository');
const eventRepository = new EventRepository();

async function createEvent(eventInfo)
{
    try 
    {
        const eventRecord = await eventRepository.create(eventInfo);
        return { event: eventRecord };
    }
    catch (error) 
    {
        console.error("Error creating event:", error);
        return false;
    }
}

module.exports = {
    createEvent,
    // getEvents,
    // getEventById,
    // subscribeToEvent
};