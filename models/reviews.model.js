const { Model, DataTypes, Sequelize } = require('sequelize');
const { pool } = require('../databases/db.config');

class Review extends Model {
    static async findReview(id) {
        const review = await Review.findOne({ where: { Review_ID: id } })
        if (review) {
            return review.dataValues
        }
        else {
            return false;
        }
    }

    static async getAllReviews(id) {
        const review = await Review.findAll({ where: { uuid } })
        if (review.length !== 0) {
            return review.dataValues;
        }
        else {
            return false;
        }
    }
}

Review.init({
    Employee_UUID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Company_UUID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.JSON
    },
    Review_status: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "pending"
    }
}, { sequelize: pool })

module.exports = { Review }