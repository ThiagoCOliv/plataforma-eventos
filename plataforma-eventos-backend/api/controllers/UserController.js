const UserService = require('../services/UserService');
const UserValidator = require('../validators/UserValidator');
const EmailService = require('../services/EmailService');

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
            id: user.id,
            name: user.name, 
            email: user.email, 
            status: user.status, 
            createdAt: user.createdAt, 
            updatedAt: user.updatedAt 
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
        const { email, validationNumber } = req.body;
        
        const canValidateAccount = UserValidator.validateAccount(email, validationNumber);
        if (!canValidateAccount.success) return res.status(400).json({
                error: 'Validation failed',
                details: canValidateAccount.errors
            });
        
        const userValidated = await UserService.validateAccount(email, validationNumber);
        if (!userValidated) return res.status(500).json({ error: 'Failed to validate account' });
        
        return res.status(200).json({ message: 'Account validated successfully', user: userValidated.user });
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createUser,
    validateAccount
};