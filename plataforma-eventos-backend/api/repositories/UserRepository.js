const UserModel = require("../models/UserModel");

class UserRepository
{
    async create(userData)
    {
        return await UserModel.create(userData);
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

    async validateAccount(email)
    {
        return await UserModel.update({ status: 'active' }, {
            where: { email },
        });
    }
}

module.exports = UserRepository;