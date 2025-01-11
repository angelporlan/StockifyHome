const sequelize = require('../config/database');
const User = require('./User');
const House = require('./House');
const Product = require('./Product');
const Category = require('./Category');
const ProductDetail = require('./ProductDetail');

// Relación User - House (One-to-Many)
User.hasMany(House, { foreignKey: 'user_id' });
House.belongsTo(User, { foreignKey: 'user_id' });

// Relación House - Product (One-to-Many)
House.hasMany(Product, { foreignKey: 'house_id' });
Product.belongsTo(House, { foreignKey: 'house_id' });

// Relación Category - Product (One-to-Many)
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Relación Product - ProductDetail (One-to-Many)
Product.hasMany(ProductDetail, { foreignKey: 'product_id' });
ProductDetail.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { sequelize, User, House, Product, Category, ProductDetail };
