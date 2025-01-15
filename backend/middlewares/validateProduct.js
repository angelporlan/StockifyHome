const { House, Category } = require('../models');

const validateProduct = async (req, res, next) => {
    try {
        const { name, house_id, category_id } = req.body;

        if (req.method === 'POST') {
            if (!name || !house_id || !category_id) {
                return res.status(400).json({ error: 'Name, house_id, and category_id are required' });
            }
        }

        const house = await House.findOne({ where: { id: house_id, user_id: req.user?.id } });
        if (!house) {
            return res.status(403).json({ error: 'House not found or access denied' });
        }

        if (category_id) {
            const category = await Category.findByPk(category_id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
        }

        if (name) {
            const existingProduct = await house.getProducts({ where: { name } });
            if (existingProduct.length > 0) {
                return res.status(400).json({ error: 'Product with the same name already exists in the house' });
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = validateProduct;
