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

async function validateAccount(email, number) 
{
    try{
        const userCheck = await userRepository.checkUser(email);
        if (!userCheck) throw new Error('User not found');
        
        if (userCheck.validationNumber !== number) throw new Error('Invalid validation number');

        const userValidated = await userRepository.validateAccount(email, number);
        if (!userValidated) throw new Error('Failed to validate account');
        
        return { user: userValidated };
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