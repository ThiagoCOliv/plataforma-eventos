const joi = require('joi');
const checkValidationResult = require('../../utils/checkValidationResult');

const validateEvent = (eventInfo) => checkValidationResult(validateEventData(eventInfo));

const validateEventData = (eventInfo) => {
    const schema = joi.object({
        title: joi.string().min(3).max(100).required(),
        description: joi.string().min(10).max(500).required(),
        date: joi.date().greater('now').required(),
        time: joi.string().pattern(/^(0[0-9]|1[0-2]):[0-5][0-9] (AM|PM)$/).required(),
        location: joi.string().min(3).max(100).required(),
        tag: joi.string().valid('educacional', 'profissional', 'social-cultural', 'esporte', 'tecnologia', 'bem-estar', 'outros').required(),
        subscriptionsLimit: joi.number().integer().positive().required(),
        image: joi.string().uri()
    });

    return schema.validate(eventInfo, { abortEarly: false });
}

const validateSubscription = (subscriptionInfo) => checkValidationResult(validateSubscriptionData(subscriptionInfo));

const validateSubscriptionData = (subscriptionInfo) => {
    const schema = joi.object({
        eventId: joi.string().uuid().required(),
        companionsNumber: joi.number().integer().min(0).max(5).required(),
        name: joi.string().min(3).max(50).required(),
        email: joi.string().email().required()
    });

    return schema.validate(subscriptionInfo, { abortEarly: false });
}

module.exports = {
    validateEvent,
    validateSubscription
}