const UserService = require('../services/UserService');
const UserValidator = require('../validators/UserValidator');
const EmailService = require('../services/EmailService');
const jwt = require('../../utils/jwt');
const generateRandomNumber = require("../../utils/generate-random-number");
const cache = require('../../utils/node-cache');

const createUser = async (req, res) => {
    try 
    {
        const { name, email, password, confirmPassword } = req.body;
        const userData = { name, email, password, confirmPassword };
        
        const canCreateUser = UserValidator.validateCreate(userData);
        if (!canCreateUser.success) return res.status(400).json({
                error: 'Validation failed',
                details: canCreateUser.errors
            });
        
        if (!await sendValidtionNumber(userData)) throw new Error('Failed to send email');

        const user = await UserService.createUser(userData);
        
        return res.status(201).json({
            message: 'User created successfully',
            token: jwt.generateToken(user)
        });
    } 
    catch (error)
    {
        console.log(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const validateAccount = async (req, res) => {
    try 
    {
        const { validationNumber } = req.body;
        const id = req.user;
        
        const canValidateAccount = UserValidator.validateAccount(id, validationNumber);
        if (!canValidateAccount.success) return res.status(400).json({
                error: 'Validation failed',
                details: canValidateAccount.errors
            });
        
        const userValidated = await UserService.validateAccount(id, validationNumber);
        if (!userValidated) throw new Error('Failed to validate account');
        
        return res.status(200).json({ message: 'Account validated successfully' });
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

const loginUser = async (req, res) => {
    try
    {
        const bodyIsValid = UserValidator.validateUserLogin(req.body);
        if (!bodyIsValid.success) return res.status(400).json({
            error: 'Validation failed',
            details: bodyIsValid.errors
        });

        const { email, password } = req.body;
        const userLogged = await UserService.login(email, password);
        
        if (!userLogged) throw new Error('Invalid email or password');
        
        return res.status(200).json({
            message: 'Login successful',
            token: jwt.generateToken(userLogged),
            user: {
                name: userLogged.name
            }
        });
    }
    catch (error) 
    {
        console.log(error);
        if (error.message === 'Invalid email or password') return res.status(401).json({ error: error.message });
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getValidationNumber = async (req, res) => {
    try 
    {
        const id = req.user;
        const user = await UserService.getUserById(id);
        if (!user) throw new Error('User not found');
        if (user.status === 'active') throw new Error('Account already validated');
        
        if (!await sendValidtionNumber(user)) throw new Error('Failed to send email');
        
        return res.status(200).json({ message: 'Validation number sent successfully' });
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

async function sendValidtionNumber(user)
{
    let validationNumber = cache.getCache(user.email);
    if (validationNumber) cache.delCache(user.email);

    validationNumber = generateRandomNumber(8);
    cache.setCache(user.email, validationNumber);
    return await EmailService.sendValidationEmail(user, validationNumber);
}

module.exports = {
    createUser,
    validateAccount,
    loginUser,
    getValidationNumber
};