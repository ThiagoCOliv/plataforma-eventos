const UserService = require('../services/UserService');
const UserValidator = require('../validators/UserValidator');

const createUser = async (req, res) => {
    try 
    {
        const userData = req.body;
        
        const canCreateUser = UserValidator.validateCreate(userData);
        if (!canCreateUser.success) return res.status(400).json({
                error: 'Validation failed',
                details: canCreateUser.errors
            });
        
        const { user } = await UserService.createUser(userData);
        
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

module.exports = {
    createUser,
};