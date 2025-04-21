const UserService = require('../services/UserService');
const UserValidator = require('../validators/UserValidator');

const createUser = async (req, res) => {
    try 
    {
        const userData = req.body;
        
        const canCreateUser = UserValidator.validateCreate(userData);
        if (canCreateUser.error) return res.status(400).json(canCreateUser.error);
        
        const userCreated = await UserService.createUser(userData);
        return res.status(201).json(userCreated);
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