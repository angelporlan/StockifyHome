const express = require('express');

const {
    createProductDetail,
    updateProductDetail,
    deleteProductDetail,
} = require('../controllers/ProductDetailController');

const authenticateToken = require('../middlewares/authenticateToken');
const validateProductDetail = require('../middlewares/validateProductDetail');

const router = express.Router();

router.post('/', authenticateToken, validateProductDetail, createProductDetail);
router.put('/:id', authenticateToken, validateProductDetail, updateProductDetail);
router.delete('/:id', authenticateToken, deleteProductDetail);

module.exports = router;