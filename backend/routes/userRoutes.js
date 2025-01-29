const express = require('express');

const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');

const authenticateToken = require('../middlewares/authenticateToken');
const {validateRegister, validateUpdateProfile} = require('../middlewares/validateRegister');

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', validateUpdateProfile, authenticateToken, updateUserProfile);

module.exports = router;
