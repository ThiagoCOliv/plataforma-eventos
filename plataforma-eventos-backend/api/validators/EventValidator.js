const joi = require('joi');
const checkValidationResult = require('../utils/checkValidationResult');

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

module.exports = {
    validateEvent
}