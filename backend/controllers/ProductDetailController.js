const { ProductDetail } = require('../models');

const createProductDetail = async (req, res) => {
    try {
        const { quantity, expiration_date, product_id } = req.body;
        const newProductDetail = await ProductDetail.create({ quantity, expiration_date, product_id });
        res.status(201).json(newProductDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await ProductDetail.update(req.body, {
            where: { id },
        });
        if (updated) {
            const updatedProductDetail = await ProductDetail.findOne({ where: { id } });
            return res.status(200).json(updatedProductDetail);
        }
        throw new Error('ProductDetail not found');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ProductDetail.destroy({
            where: { id },
        });
        if (deleted) {
            return res.status(204).send('ProductDetail deleted');
        }
        throw new Error('ProductDetail not found');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { createProductDetail, updateProductDetail, deleteProductDetail };