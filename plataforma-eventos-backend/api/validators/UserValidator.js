const joi = require('joi');

const validateCreate = (userData) => {
    const validationResult = validateUserData(userData);

    if (validationResult.error) return {
            success: false,
            errors: validationResult.error.details.map(err => err.message)
        };

    return { success: true };
};

const validateAccount = (id, number) => {
    const validationResult = validateInfo(id, number);

    if (validationResult.error) return {
            success: false,
            errors: validationResult.error.details.map(err => err.message)
        };

    return { success: true };
};

const validateUserData = (userData) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(100).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required()
    });

    return schema.validate(userData, { abortEarly: false });
}

const validateInfo = (id, number) => {
    const schema = joi.object({
        id: joi.string().uuid().required(),
        number: joi.string().length(8).pattern(/^[0-9]+$/).required()
    });

    return schema.validate({ id, number: number.toString() }, { abortEarly: false });
}

module.exports = {
    validateCreate,
    validateAccount
}