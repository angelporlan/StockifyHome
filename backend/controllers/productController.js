const { Product, Category, ProductDetail } = require('../models');
const fs = require('fs');
const path = require('path');

const saveBase64Image = (base64Image, folderPath, fileName) => {
    const matches = base64Image.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 image');
    }
    const imageBuffer = Buffer.from(matches[2], 'base64');
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, imageBuffer);
    return fileName;
};

const deleteImage = (imageName, folderPath) => {
    const filePath = path.join(folderPath, imageName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, image, house_id, category_id } = req.body;
        let imageName = null;
        if (image) {
            const uploadsDir = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }
            const fileName = `${Date.now()}.png`;
            imageName = saveBase64Image(image, uploadsDir, fileName);
        }
        const newProduct = await Product.create({ name, image: imageName, house_id, category_id });
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
            include: [
                { model: Category, attributes: ['name'] },
                { model: ProductDetail, attributes: ['id', 'quantity', 'expiration_date'] }
            ]
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
            include: [
                { model: Category, attributes: ['name'] },
                { model: ProductDetail, attributes: ['id', 'quantity', 'expiration_date'] }
            ]
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

        const uploadsDir = path.join(__dirname, '../uploads');
        if (image && product.image) {
            deleteImage(product.image, uploadsDir);
        }

        product.name = name || product.name;
        product.category_id = category_id || product.category_id;
        if (image) {
            const fileName = `${Date.now()}.png`;
            product.image = saveBase64Image(image, uploadsDir, fileName);
        }
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

        const uploadsDir = path.join(__dirname, '../uploads');
        if (product.image) {
            deleteImage(product.image, uploadsDir);
        }

        await product.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProduct, getProductsByHouse, getProductById, updateProduct, deleteProduct };
