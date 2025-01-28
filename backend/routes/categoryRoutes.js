const express = require('express');
const { getCategories } = require('../controllers/categoryController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/', authenticateToken, getCategories);

module.exports = router;