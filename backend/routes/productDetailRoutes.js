const express = require('express');
const {
    createProductDetail,
    updateProductDetail,
    deleteProductDetail,
} = require('../controllers/ProductDetailController');

const authenticateToken = require('../middlewares/authenticateToken');
const validateProductDetail = require('../middlewares/validateProductDetail');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ProductDetail
 *   description: Operations related to product details (quantity and expiration).
 */

/**
 * @swagger
 * /productdetails:
 *   post:
 *     summary: Create product details
 *     description: Create one or more product details.
 *     tags: [ProductDetail]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 quantity:
 *                   type: integer
 *                   example: 10
 *                 expiration_date:
 *                   type: string
 *                   format: date
 *                   example: "2025-12-31"
 *                 product_id:
 *                   type: integer
 *                   example: 1
 *     responses:
 *       201:
 *         description: Product details created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductDetail'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken, validateProductDetail, createProductDetail);

/**
 * @swagger
 * /productdetails/{id}:
 *   put:
 *     summary: Update product detail
 *     description: Update the quantity of a specific product detail.
 *     tags: [ProductDetail]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product detail ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Product detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDetail'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product detail not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authenticateToken, validateProductDetail, updateProductDetail);

/**
 * @swagger
 * /productdetails/{id}:
 *   delete:
 *     summary: Delete product detail
 *     description: Delete a specific product detail by ID.
 *     tags: [ProductDetail]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product detail ID
 *     responses:
 *       204:
 *         description: Product detail deleted successfully
 *       404:
 *         description: Product detail not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticateToken, deleteProductDetail);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 10
 *         expiration_date:
 *           type: string
 *           format: date
 *           example: "2025-12-31"
 *         product_id:
 *           type: integer
 *           example: 1
 *       required:
 *         - quantity
 *         - expiration_date
 *         - product_id
 */

/**
 * @swagger
 * securitySchemes:
 *   BearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
