const { ProductDetail } = require('../models');

const validateProductDetail = async (req, res, next) => {
    try {
        let productDetails = req.body;

        if (!Array.isArray(productDetails)) {
            productDetails = [productDetails]; 
        }

        for (const detail of productDetails) {
            const { quantity, expiration_date, product_id } = detail;

            if (req.method === 'PUT') {
                if (quantity < 0) {
                    return res.status(400).json({ error: 'Quantity must be greater or equal to 0' });
                }
            } else if (req.method === 'POST') {
                if (quantity === undefined || !expiration_date || !product_id) {
                    return res.status(400).json({ error: 'Quantity, expiration_date, and product_id are required' });
                }

                if (isNaN(Date.parse(expiration_date))) {
                    return res.status(400).json({ error: 'Expiration date must be a valid date' });
                }

                if (quantity < 0) {
                    return res.status(400).json({ error: 'Quantity must be greater or equal to 0' });
                }

                const existingProductDetail = await ProductDetail.findOne({ where: { expiration_date, product_id } });
                if (existingProductDetail) {
                    return res.status(400).json({ error: 'ProductDetail with the same expiration date already exists' });
                }
            }
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while validating ProductDetail' });
    }
};

module.exports = validateProductDetail;
