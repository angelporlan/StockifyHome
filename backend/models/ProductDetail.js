const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductDetail = sequelize.define('ProductDetail', {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    expiration_date: { type: DataTypes.DATE, allowNull: false },
});

module.exports = ProductDetail;
