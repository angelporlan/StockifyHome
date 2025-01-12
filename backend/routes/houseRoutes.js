const express = require('express');
const {createHouse, getHouses, getHouseById, updateHouse, deleteHouse} = require('../controllers/houseController');
const authenticateToken = require('../middlewares/authenticateToken');
const validateHouseData = require('../middlewares/validateHouseData');

const router = express.Router();

router.post('/', authenticateToken, validateHouseData, createHouse);
router.get('/', authenticateToken, getHouses);
router.get('/:id', authenticateToken, getHouseById);
router.put('/:id', authenticateToken, validateHouseData, updateHouse);
router.delete('/:id', authenticateToken, deleteHouse);

module.exports = router;