const UserModel = require("../models/UserModel");

class UserRepository
{
    async create(userData)
    {
        return UserModel.create({
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
    }

    async checkUser(emailPassed)
    {
        const userCheck = await UserModel.findOne({
            paranoid: false,
            where: { email: emailPassed }
        });

        return userCheck;
    }
}

module.exports = UserRepository;