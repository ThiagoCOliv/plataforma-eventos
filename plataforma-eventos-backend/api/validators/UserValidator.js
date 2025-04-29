const joi = require('joi');

const validateCreate = (userData) => {
    const validationResult = validateUserData(userData);

    if (validationResult.error) return {
            success: false,
            errors: validationResult.error.details.map(err => err.message)
        };

    return { success: true };
};

const validateAccount = async (email, number) => {
    const validationResult = validateInfo(email, number);

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

const validateInfo = (email, number) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        number: joi.number().integer().min(0).max(99999999).required()
    });

    return schema.validate({ email, number }, { abortEarly: false });
}

module.exports = {
    validateCreate,
    validateAccount
}