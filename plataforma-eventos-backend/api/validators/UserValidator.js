const joi = require('joi');
const checkValidationResult = require('../../utils/checkValidationResult');

const validateCreate = (userData) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(100).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required()
    });

    return checkValidationResult(schema.validate(userData, { abortEarly: false }));
}

const validateAccount = (id, number) => {
    const schema = joi.object({
        id: joi.string().uuid().required(),
        number: joi.string().length(8).pattern(/^[0-9]+$/).required()
    });

    return checkValidationResult(schema.validate({ id, number: number.toString() }, { abortEarly: false }));
}

const validateUserLogin = (userData) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(100).required()
    });

    return checkValidationResult(schema.validate(userData, { abortEarly: false }));
}

module.exports = {
    validateCreate,
    validateAccount,
    validateUserLogin
}