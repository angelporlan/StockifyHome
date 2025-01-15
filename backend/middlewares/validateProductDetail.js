const { ProductDetail } = require('../models');

const validateProductDetail = async (req, res, next) => {
    const { quantity, expiration_date, product_id } = req.body;

    if (!quantity || !expiration_date || !product_id) {
        return res.status(400).json({ error: 'Quantity, expiration_date, and product_id are required' });
    }

    if (quantity < 0) {
        return res.status(400).json({ error: 'Quantity must be greater or equal to 0' });
    }

    next();
};

module.exports = validateProductDetail;