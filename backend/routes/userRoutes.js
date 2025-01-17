const express = require('express');

const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

const authenticateToken = require('../middlewares/authenticateToken');
const validateRegister = require('../middlewares/validateRegister');

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
