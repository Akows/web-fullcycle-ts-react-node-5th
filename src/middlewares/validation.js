const { check, validationResult, query } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

exports.validateId = [
    check('id').isInt({ min: 1 }).withMessage('ID는 1 이상의 정수여야 합니다.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateCategoryId = [
    check('categoryId').isInt({ min: 1 }).withMessage('categoryId는 1 이상의 정수여야 합니다.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateFilteredBooks = [
    query('page').optional().isInt({ min: 1 }).withMessage('page는 1 이상의 정수여야 합니다.'),
    query('limit').optional().isInt({ min: 1 }).withMessage('limit는 1 이상의 정수여야 합니다.'),
    query('categoryId').optional().isInt({ min: 1 }).withMessage('categoryId는 1 이상의 정수여야 합니다.'),
    query('isNew').optional().isBoolean().withMessage('isNew는 true 또는 false여야 합니다.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        next();
    },
];