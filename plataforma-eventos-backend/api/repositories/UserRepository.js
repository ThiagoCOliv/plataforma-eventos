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

    async checkUser(email)
    {
        const userCheck = await UserModel.findOne({
            paranoid: false,
            where: { email }
        });

        return userCheck;
    }

    async getUserById(id)
    {
        return await UserModel.findOne({
            where: { id },
            attributes: { exclude: ['password'] }
        });
    }

    async validateAccount(id, number)
    {
        return await UserModel.update({ status: 'active' }, {
            where: { id, validationNumber: number.toString() },
        });
    }
}

module.exports = UserRepository;