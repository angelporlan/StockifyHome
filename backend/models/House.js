const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const House = sequelize.define('House', {
    name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = House;
