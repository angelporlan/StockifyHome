const express = require('express');
const {
    createProduct,
    getProductsByHouse,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticateToken');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.post('/', authenticateToken, validateProduct, createProduct); 
router.put('/:id', authenticateToken, validateProduct, updateProduct); 
router.get('/house/:house_id', authenticateToken, getProductsByHouse); 
router.get('/:id', authenticateToken, getProductById);
router.delete('/:id', authenticateToken, deleteProduct); 

module.exports = router;
