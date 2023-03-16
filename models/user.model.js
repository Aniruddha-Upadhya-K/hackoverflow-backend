const { pool } = require("../databases/db.config");
const { DataTypes, Model } = require('sequelize')


class User extends Model {
    async createUser() {
        await this.save();
        console.log("User Created");
    }

    static async deleteUserByID(id) {
        await User.destroy({
            where: {
                contact: id
            }
        });
        console.log("User Deleted");
    }

    static async findUserByID(id) {
        const user = await User.findOne({ where: { contact: id } });
        console.log(user.dataValues);
    }
};

User.init({
    FullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: pool });

module.exports = { User };