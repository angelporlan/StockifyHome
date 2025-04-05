const express = require('express');
const { getRecipe } = require('../controllers/openaiController');
const authenticateToken = require('../middlewares/authenticateToken');

/**
 * @swagger
 * tags:
 *  name: OpenAI
 *  description: OpenAI API endpoints for generating recipes
 */

const router = express.Router();

/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Generate a recipe based on ingredients
 *     tags: [OpenAI]
 *     security: 
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               food:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["chicken", "rice", "broccoli"]
 *               lg:
 *                 type: string
 *                 example: "es"
 *     responses:
 *       200:
 *         description: Recipe generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Arroz con Pollo Tradicional"
 *                 description:
 *                   type: string
 *                   example: "Un clásico plato reconfortante..."
 *                 servings:
 *                   type: string
 *                   example: "4 personas"
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 instructions:
 *                   type: array
 *                   items:
 *                     type: string
 *                 tips:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.post('/recipe', authenticateToken, getRecipe);

module.exports = router;