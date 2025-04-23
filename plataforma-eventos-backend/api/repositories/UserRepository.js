const UserModel = require("../models/UserModel");
const generateRandomNumber = require("../../utils/generate-random-number");

class UserRepository
{
    async create(userData)
    {
        return await UserModel.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            validationNumber: generateRandomNumber(8)
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