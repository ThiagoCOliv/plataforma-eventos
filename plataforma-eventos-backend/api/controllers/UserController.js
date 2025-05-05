const UserService = require('../services/UserService');
const UserValidator = require('../validators/UserValidator');
const EmailService = require('../services/EmailService');
const jwt = require('../../utils/jwt');

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
        
        const { user } = await UserService.createUser(userData);
        if (!EmailService.sendEmail(user)) throw new Error('Failed to send email');
        
        return res.status(201).json({
            message: 'User created successfully',
            token: jwt.generateToken(user)
        });
    } 
    catch (error)
    {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const validateAccount = async (req, res) => {
    try 
    {
        const { validationNumber } = req.body;
        const id = req.user.id;
        
        const canValidateAccount = UserValidator.validateAccount(id, validationNumber);
        if (!canValidateAccount.success) return res.status(400).json({
                error: 'Validation failed',
                details: canValidateAccount.errors
            });
        
        const userValidated = await UserService.validateAccount(id, validationNumber);
        if (!userValidated) return res.status(500).json({ error: 'Failed to validate account' });
        
        return res.status(200).json({ message: 'Account validated successfully' });
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const loginUser = async (req, res) => {
    res.status(500).json({ error: 'Method not implemented' });
}

const getUserEvents = async (req, res) => {
    res.status(500).json({ error: 'Method not implemented' });
}

const updateUserEvent = async (req, res) => {
    res.status(500).json({ error: 'Method not implemented' });
}

module.exports = {
    createUser,
    validateAccount,
    loginUser,
    getUserEvents,
    updateUserEvent
};