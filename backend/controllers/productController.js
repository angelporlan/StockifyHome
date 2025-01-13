const { Product, Category } = require('../models');

const createProduct = async (req, res) => {
    try {
        const { name, image, house_id, category_id } = req.body;
        const newProduct = await Product.create({ name, image, house_id, category_id });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductsByHouse = async (req, res) => {
    try {
        const { house_id } = req.params;

        const products = await Product.findAll({
            where: { house_id },
            include: [{ model: Category, attributes: ['name'] }]
        });

        if (products[0].house_id !== parseInt(house_id)) return res.status(404).json({ error: 'House not found or access denied' });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            include: [{ model: Category, attributes: ['name'] }]
        });

        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, category_id } = req.body;

        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        product.name = name || product.name;
        product.image = image || product.image;
        product.category_id = category_id || product.category_id;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        await product.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProduct, getProductsByHouse, getProductById, updateProduct, deleteProduct };
