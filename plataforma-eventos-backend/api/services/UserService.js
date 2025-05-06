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
        
        const cachedNumber = cache.getCache(userCheck.email);
        if (!cachedNumber) throw new Error('Validation number expired or not found');
        if (cachedNumber !== number.toString()) throw new Error('Invalid validation number');
        if(userCheck.status === 'active') throw new Error('Account already validated');

        const userValidated = await userRepository.validateAccount(userCheck.email);
        if (!userValidated) throw new Error('Failed to validate account');
        
        return true;
    }
    catch (error) 
    {
        console.error("Error validating account:", error);
        return false;
    }
}

async function login(email, password) 
{
    try 
    {
        const userCheck = await userRepository.checkUser(email);
        if (!userCheck) throw new Error('User not found');
        
        const isPasswordValid = await userCheck.checkPassword(password);
        if (!isPasswordValid) throw new Error('Invalid password');
        
        return userCheck;
    } 
    catch (error) 
    {
        console.error("Error logging in:", error);
        return false;
    }
}

module.exports = {
    createUser,
    validateAccount,
    login
};