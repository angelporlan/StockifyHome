const express = require('express');
const { createHouse, getHouses, getHouseById, updateHouse, deleteHouse } = require('../controllers/houseController');
const authenticateToken = require('../middlewares/authenticateToken');
const validateHouseData = require('../middlewares/validateHouseData');

/**
 * @swagger
 * tags:
 *  name: Houses
 *  description: API endpoints for managing houses
 */

const router = express.Router();

/**
 * @swagger
 * /houses:
 *   post:
 *     summary: Create a new house
 *     security:
 *       - BearerAuth: []
 *     tags: [Houses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My House"
 *     responses:
 *       201:
 *         description: House created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateToken, validateHouseData, createHouse);

/**
 * @swagger
 * /houses:
 *   get:
 *     summary: Get all houses for the authenticated user
 *     security:
 *       - BearerAuth: []
 *     tags: [Houses]
 *     responses:
 *       200:
 *         description: List of houses
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateToken, getHouses);

/**
 * @swagger
 * /houses/{id}:
 *   get:
 *     summary: Get a house by ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: House details
 *       404:
 *         description: House not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticateToken, getHouseById);

/**
 * @swagger
 * /houses/{id}:
 *   put:
 *     summary: Update a house by ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated House Name"
 *     responses:
 *       200:
 *         description: House updated successfully
 *       404:
 *         description: House not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticateToken, validateHouseData, updateHouse);

/**
 * @swagger
 * /houses/{id}:
 *   delete:
 *     summary: Delete a house by ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: House deleted successfully
 *       404:
 *         description: House not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticateToken, deleteHouse);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     House:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Casa del Lago"
 *         user_id:
 *           type: integer
 *           example: 1
 *       required:
 *         - name
 *         - user_id
 */

/**
 * @swagger
 * securitySchemes:
 *   BearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
