const EventRepository = require('../repositories/EventRepository');
const SubscriptionRepository = require('../repositories/SubscriptionRepository');
const UserRepository = require('../repositories/UserRepository');
const eventRepository = new EventRepository();
const subscriptionRepository = new SubscriptionRepository();
const userRepository = new UserRepository();

const createEvent = async (eventInfo) => await eventRepository.create(eventInfo);
const getEvents = async () => await eventRepository.getEvents();
const getEventById = async (id) => await eventRepository.getEventById(id);

const subscribeToEvent = async (subscriptionInfo) => {
    try 
    {
        const event = await eventRepository.getEventById(subscriptionInfo.eventId);
        if (!event) throw new Error('Event not found');
        if (event.subscriptionsLimit < subscriptionInfo.companionsNumber + 1) throw new Error('Event subscriptions limit reached');

        const eventSubscribed = await subscriptionRepository.subscribeToEvent(subscriptionInfo);
        if (!eventSubscribed) throw new Error('Failed to subscribe to event');

        const eventUpdated = await eventRepository.subscribeToEvent(event, eventSubscribed.companionsNumber + 1);
        if (!eventUpdated) throw new Error('Failed to update event subscriptions limit');

        return true;
    }
    catch (error) 
    {
        console.error("Error subscribing to event:", error);
        return false;
    }
}

const updateEvent = async (eventId, userId, eventData) => {
    try 
    {
        const event = await eventRepository.getEventById(eventId);
        if (!event) throw new Error('Event not found');
        if (event.userId !== userId) throw new Error('User not authorized to update this event');

        const updatedEvent = await eventRepository.updateEvent(eventId, eventData);
        if (!updatedEvent) throw new Error('Failed to update event');

        return true;
    }
    catch (error) 
    {
        console.error("Error updating event:", error);
        return false;
    }
}

async function getUserEvents(userId)
{
    try 
    {
        const userCheck = await userRepository.getUserById(userId);
        if (!userCheck) throw new Error('User not found');
        if (userCheck.status !== 'active') throw new Error('Account not validated');

        return await eventRepository.getEventsByUserId(userId);
    } 
    catch (error) 
    {
        console.error("Error getting user events:", error);
        return false;
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    subscribeToEvent,
    updateEvent,
    getUserEvents
};