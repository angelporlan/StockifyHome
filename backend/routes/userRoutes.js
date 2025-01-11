const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', (req, res) => {
    res.json({ message: 'User route works!' });
});
module.exports = router;
