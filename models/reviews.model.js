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
        const reviews = await Review.findAll({ where: { Employee_UUID: id } })
        if (reviews.length !== 0) {
            return reviews.map((review, index)=>{
                return review.dataValues;
            });
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
        defaultValue: "pending"
    }
}, { sequelize: pool })

module.exports = { Review }