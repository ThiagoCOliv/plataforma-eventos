const EventValidator = require('../validators/EventValidator');
const EventService = require('../services/EventService');

const createEvent = async (req, res) => {
    try {
        const { title, description, date, time, location, tag, subscriptionsLimit, image } = req.body;
        const userId = req.user.id;

        const eventInfo = { title, description, date, time, location, tag, subscriptionsLimit, image, userId };
        
        const canCreateEvent = EventValidator.validateEvent(eventInfo);
        if (!canCreateEvent.success) return res.status(400).json({
            error: 'Validation failed',
            details: canCreateEvent.errors
        });

        const { event } = await EventService.createEvent(eventInfo);
        if (!event) return res.status(500).json({ error: 'Failed to create event' });

        return res.status(201).json({ message: 'Event created successfully' });
    }
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getEvents = async (req, res) => {
    try {
        const events = await EventService.getEvents();
        
        if (!events) return res.status(500).json({ error: 'Failed to fetch events' });
        
        return res.status(200).json(events);
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getEventById = async (req, res) => {
    try 
    {
        const event = await EventService.getEventById(req.params.id);
        
        if (!event) return res.status(404).json({ error: 'Event not found' });
        
        return res.status(200).json(event);
    }
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const subscribeToEvent = async (req, res) => {
    try 
    {
        const { eventId, companionsNumber, name, email } = req.body;
        
        const subscriptionInfo = { eventId, companionsNumber, name, email };
        
        const canSubscribeToEvent = EventValidator.validateSubscription(subscriptionInfo);
        if (!canSubscribeToEvent.success) return res.status(400).json({
            error: 'Validation failed',
            details: canSubscribeToEvent.errors
        });
        
        const isSubscribed = await EventService.subscribeToEvent(subscriptionInfo);
        
        if (!isSubscribed) return res.status(500).json({ error: 'Failed to subscribe to event' });
        
        return res.status(200).json({ message: 'Subscribed to event successfully' });
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserEvents = async (req, res) => {
    try
    {
        const userId = req.user.id;
        const userEvents = await EventService.getUserEvents(userId);
        
        return res.status(200).json({
            message: 'User events retrieved successfully',
            events: userEvents
        });
    }
    catch (error)
    {
        console.log(error);

        if (error.message === 'User not found') return res.status(404).json({ error: 'User not found' });
        if (error.message === 'Account not validated') return res.status(401).json({ error: 'Account not validated' });
        
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateEvent = async (req, res) => {
    try
    {
        const eventId = req.params.id;
        const userId = req.user.id;
        const { title, description, date, time, location, tag, subscriptionsLimit, image } = req.body;
        const eventData = { title, description, date, time, location, tag, subscriptionsLimit, image };
        
        const canUpdateEvent = EventValidator.validateEvent(eventData);
        if (!canUpdateEvent.success) return res.status(400).json({
            error: 'Validation failed',
            details: canUpdateEvent.errors
        });
        
        const updatedEvent = await EventService.updateEvent(eventId, userId, eventData);
        
        if (!updatedEvent) throw new Error('Failed to update event');
        
        return res.status(200).json({
            message: 'Event updated successfully',
            event: updatedEvent
        });
    }
    catch (error)
    {
        console.log(error);

        if (error.message === 'Event not found') return res.status(404).json({ error: error.message });
        if (error.message === 'User not authorized to update this event') return res.status(401).json({ error: error.message });
        
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    subscribeToEvent,
    updateEvent,
    getUserEvents
}