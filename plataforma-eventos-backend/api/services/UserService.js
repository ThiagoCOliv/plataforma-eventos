const UserRepository = require('../repositories/UserRepository');
const userRepository = new UserRepository();

async function createUser(userData) 
{
    const userRecord = await userRepository.create(userData);
    delete userRecord.password;
  
    return { user: userRecord };
}

module.exports = {
    createUser,
};