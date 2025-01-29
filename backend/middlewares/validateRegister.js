const { body, validationResult } = require('express-validator');
const { User } = require('../models');

const validateRegister = [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('username').isAlphanumeric().withMessage('Username must contain only letters and numbers'),
    body('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    
    body('email').isEmail().withMessage('Valid email is required'),
    body('email').custom(async (email) => {
        const user = await User.findOne({ where: { email } });
        if (user) {
            throw new Error('Email already in use');
        }
    }
    ),
    
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        next();
    }
];

const validateUpdateProfile = [
    body('username').optional().isAlphanumeric().withMessage('Username must contain only letters and numbers'),
    body('username').optional().isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('email').optional().custom(async (email, { req }) => {
        const user = await User.findOne({ where: { email } });
        if (user && user.id !== req.user.id) {
            throw new Error('Email already in use');
        }
    }
    ),
    
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        next();
    }
];

module.exports = { validateRegister, validateUpdateProfile };
