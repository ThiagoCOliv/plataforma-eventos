const UserRepository = require('../repositories/UserRepository');
const userRepository = new UserRepository();

async function createUser(userData) 
{
    try 
    {
        const userRecord = await userRepository.create(userData);
        delete userRecord.password;
    
        return { user: userRecord };
    }
    catch (error) 
    {
        console.error("Error creating user:", error);
        return false;
    }
}

async function validateAccount(id, number) 
{
    try{
        const userCheck = await userRepository.getUserById(id);
        if (!userCheck) throw new Error('User not found');
        
        if (userCheck.validationNumber !== number.toString()) throw new Error('Invalid validation number');
        if(userCheck.status === 'active') throw new Error('Account already validated');

        const userValidated = await userRepository.validateAccount(id, number);
        if (!userValidated) throw new Error('Failed to validate account');
        
        return true;
    }
    catch (error) 
    {
        console.error("Error validating account:", error);
        return false;
    }
}

module.exports = {
    createUser,
    validateAccount
};