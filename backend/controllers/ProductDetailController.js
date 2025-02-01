const { ProductDetail } = require('../models');

const createProductDetail = async (req, res) => {
    try {
        let productDetails = req.body;

        if (!Array.isArray(productDetails)) {
            productDetails = [productDetails];
        }

        const newProductDetails = await ProductDetail.bulkCreate(productDetails);
        res.status(201).json(newProductDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const [updated] = await ProductDetail.update({ quantity }, {
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