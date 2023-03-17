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
        if (user) {
            return user.dataValues;
        }
        else {
            return false;
        }
    }

    static async getUUID(contact) {
        const user = await User.findOne({ where: { contact } });
        if (user) {
            return user.dataValues.uuid;
        }
        else {
            return false;
        }
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
    },
    image_path: { type: DataTypes.STRING, },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: pool });

module.exports = { User };