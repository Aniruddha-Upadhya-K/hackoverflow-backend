const { pool } = require("../databases/db.config");
const { DataTypes, Model } = require('sequelize');
const { hashPassword, generateUUID } = require('../utils/auth');


class User extends Model {
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
        console.log(user);
    }
};

User.init({
    FullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uuid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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