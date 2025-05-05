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

        return res.status(201).json({ message: 'Event created successfully' });
    }
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getEvents = async (req, res) => {
    res.status(500).json({ error: 'Method not implemented' });
}

const getEventById = async (req, res) => {
    res.status(500).json({ error: 'Method not implemented' });
}

const subscribeToEvent = async (req, res) => {
    res.status(500).json({ error: 'Method not implemented' });
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    subscribeToEvent
}